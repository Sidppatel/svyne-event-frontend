import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAsync } from '@/shared/hooks/useAsync';
import {
  getEvent,
  getEventStats,
  changeEventStatus,
  updateEvent,
  listEventTableTypes,
  createEventTable,
  deleteEventTable,
  setEventFeesIncluded,
  listTicketTypes,
} from '@/features/admin/services/eventAdminService';
import { listTableTemplates } from '@/features/admin/services/tableTemplateService';
import { getVenue, listVenues } from '@/features/admin/services/catalogService';
import { EventCatalogLinks } from '@/features/admin/components/EventCatalogLinks';
import { EventExtraInfoEditor } from '@/features/admin/components/EventExtraInfoEditor';
import { getEventLayout } from '@/features/admin/services/layoutService';
import { tzForState, epochToZonedInput, zonedInputToEpoch, zoneAbbrev } from '@/shared/lib/timezone';
import { DateTimePicker } from '@/shared/ui/date-time-picker';
import type { TableTemplate } from '@/shared/proto/booking';
import { PricingManager } from '@/features/admin/components/PricingManager';
import { ScheduleTimeline } from '@/features/admin/components/ScheduleTimeline';
import { TicketTypesManager } from '@/features/admin/components/TicketTypesManager';
import { FloorPlanPanel } from '@/features/admin/components/FloorPlanPanel';
import { EventMediaManager } from '@/features/admin/components/EventMediaManager';
import type { Event } from '@/shared/proto/event';
import {
  listStaffForEvent,
  assignStaffByEmail,
  unassignStaff,
} from '@/features/admin/services/staffAdminService';
import { toast } from 'sonner';
import { rpcErrorMessage } from '@/shared/session';
import { centsToUSD, centsToUsdInput, usdToCents } from '@/shared/lib/format';
import { addCents } from '@/shared/lib/math';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Select } from '@/shared/ui/select';
import { Label } from '@/shared/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import {
  CalendarCheck2,
  DollarSign,
  FileEdit,
  LayoutGrid,
  Rocket,
  Ticket,
  TicketCheck,
  Undo2,
  UserCog,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Eye,
  type LucideIcon,
} from 'lucide-react';
import { EventBrandingPreview } from '@/features/admin/components/branding/EventBrandingPreview';


const STATUS_STYLES: Record<string, string> = {
  Published: 'bg-success/15 text-success ring-success/30',
  Draft: 'bg-amber/15 text-amber-foreground ring-amber/30',
  Cancelled: 'bg-destructive/15 text-destructive ring-destructive/30',
};

function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ring-1 ring-inset',
        STATUS_STYLES[status] ?? 'bg-muted text-muted-foreground ring-border',
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}



export function AdminEventManagePage() {
  const { eventsId = '' } = useParams();
  const eventLoader = useCallback(() => getEvent(eventsId), [eventsId]);
  const statsLoader = useCallback(() => getEventStats(eventsId), [eventsId]);
  const tableTypesLoader = useCallback(() => listEventTableTypes(eventsId), [eventsId]);
  const staffLoader = useCallback(() => listStaffForEvent(eventsId), [eventsId]);
  const templatesLoader = useCallback(() => listTableTemplates().then((items) => items.filter((t) => t.isActive)), []);
  const ticketTypesLoader = useCallback(() => listTicketTypes(eventsId), [eventsId]);
  const layoutLoader = useCallback(() => getEventLayout(eventsId), [eventsId]);

  const event = useAsync(eventLoader);
  const venuesId = event.data?.venuesId;
  const venueLoader = useCallback(
    () => (venuesId ? getVenue(venuesId) : Promise.resolve(null)),
    [venuesId],
  );
  const venue = useAsync(venueLoader);
  const timeZone = tzForState(venue.data?.state);
  const stats = useAsync(statsLoader);
  const tableTypes = useAsync(tableTypesLoader);
  const staff = useAsync(staffLoader);
  const templates = useAsync(templatesLoader);
  const ticketTypes = useAsync(ticketTypesLoader);
  const layout = useAsync(layoutLoader);

  const hasTicketTypes = (ticketTypes.data ?? []).length > 0;
  const hasTablesInFloorPlan = (layout.data?.tables ?? []).length > 0;
  const canPublish = hasTicketTypes || hasTablesInFloorPlan;

  const typeList = tableTypes.data ?? [];
  const lockedTypeIds = new Set(
    (layout.data?.tables ?? []).filter((t) => t.status && t.status !== 'Available').map((t) => t.eventTablesId),
  );
  const usedTemplateNames = new Set(typeList.map((t) => t.label));
  const templateList = (templates.data ?? []).filter((t) => !usedTemplateNames.has(t.name));

  // Admin picks a catalog table type; values below override the template defaults.
  const [tableTemplateId, setTableTemplateId] = useState('');
  const [tableLabel, setTableLabel] = useState('');
  const [tableCapacity, setTableCapacity] = useState(8);
  const [tablePriceCents, setTablePriceCents] = useState(0);
  const [tableColor, setTableColor] = useState('');
  const tableIsAllInclusive = true;
  const tablePerAttendeeCents = 0;
  const [tableWidth, setTableWidth] = useState(80);
  const [tableHeight, setTableHeight] = useState(80);

  function selectTemplate(id: string) {
    setTableTemplateId(id);
    const tpl: TableTemplate | undefined = templateList.find((t) => t.tableTemplatesId === id);
    if (tpl) {
      setTableLabel(tpl.name);
      setTableCapacity(tpl.defaultCapacity);
      setTablePriceCents(tpl.defaultPriceCents);
      setTableColor(tpl.defaultColor);
      setTableWidth(tpl.defaultWidth || 80);
      setTableHeight(tpl.defaultHeight || 80);
    }
  }
  const [assignEmail, setAssignEmail] = useState('');
  const [notice, setNotice] = useState<string | null>(null);
  // Bumped when a table type is added so the floor-plan palette reloads.
  const [floorKey, setFloorKey] = useState(0);
  // Bumped when table types change so the Pricing panel reloads (each type owns a price).
  const [pricingKey, setPricingKey] = useState(0);

  async function guard(action: () => Promise<void>, reload?: () => void) {
    setNotice(null);
    try {
      await action();
      reload?.();
    } catch (caught) {
      setNotice(rpcErrorMessage(caught));
    }
  }

  const STEPS = [
    { id: 'basics', label: 'Basics', icon: MapPin },
    ...(event.data?.eventType !== 'Open' ? [{ id: 'layout', label: 'Floor Plan', icon: LayoutGrid }] : []),
    { id: 'pricing', label: 'Pricing & Tickets', icon: Ticket },
    { id: 'timeline', label: 'Timeline & Media', icon: CalendarCheck2 },
    { id: 'staff', label: 'Staff & Roster', icon: Users },
    { id: 'preview', label: 'Preview', icon: Eye },
    { id: 'publish', label: 'Review & Publish', icon: Rocket },
  ];

  const [currentStep, setCurrentStep] = useState(STEPS[0].id);

  function goNext() {
    const idx = STEPS.findIndex(s => s.id === currentStep);
    if (idx !== -1 && idx < STEPS.length - 1) setCurrentStep(STEPS[idx + 1].id);
  }

  function goPrev() {
    const idx = STEPS.findIndex(s => s.id === currentStep);
    if (idx > 0) setCurrentStep(STEPS[idx - 1].id);
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {event.loading ? (
        <div className="flex items-center gap-2 justify-center py-8">
          <div className="size-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="text-xs text-muted-foreground font-semibold">Loading event data…</p>
        </div>
      ) : null}
      {event.error ? <p className="text-xs font-semibold text-destructive bg-destructive/10 border border-destructive/20 rounded-xl p-3 leading-normal animate-shake">{event.error}</p> : null}
      {notice ? <p className="text-xs font-semibold text-warning bg-warning/10 border border-warning/20 rounded-xl p-3 leading-normal">{notice}</p> : null}

      {event.data ? (
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="bg-muted/30 p-5 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-2">
                <StatusPill status={event.data.status} />
                <h1 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                  {event.data.title}
                </h1>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {event.data.eventType || 'Open'} event · {event.data.category || 'Uncategorised'}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button
                  size="sm"
                  className={cn("svyne-spring-btn h-9 px-4 rounded-lg font-bold text-xs", event.data.status === 'Published' ? "hidden" : "")}
                  disabled={!canPublish || event.data.status === 'Published'}
                  title={event.data.status === 'Published' ? "Event is already published" : canPublish ? "Publish this event" : "Cannot publish until you add at least one ticket type or place a table on the floor plan"}
                  onClick={() => guard(() => changeEventStatus(eventsId, 'Published'), event.reload)}
                >
                  <Rocket className="mr-1 h-4 w-4" /> Publish
                </Button>
                {event.data.status === 'Published' && (
                  <Button size="sm" variant="outline" className="h-9 px-4 rounded-lg font-bold text-xs border-border bg-background" onClick={() => guard(() => changeEventStatus(eventsId, 'Draft'), event.reload)}>
                    <Undo2 className="mr-1 h-4 w-4" /> Revert to draft
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {event.data && (
        <div className="flex items-center justify-between overflow-x-auto pb-2 border-b border-border/20 sticky top-0 bg-background z-10 py-2">
          {STEPS.map((step, index) => {
            const isActive = step.id === currentStep;
            return (
              <div key={step.id} className="flex items-center cursor-pointer" onClick={() => setCurrentStep(step.id)}>
                <div className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all duration-200",
                  isActive ? "bg-primary/10 text-primary scale-105" : "text-muted-foreground opacity-60 hover:opacity-100 hover:bg-muted/50"
                )}>
                  <step.icon className="h-4.5 w-4.5" />
                  <span>{step.label}</span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className="w-8 h-px bg-border/40 mx-2" />
                )}
              </div>
            );
          })}
        </div>
      )}

      {currentStep === 'basics' && event.data && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <EditSection event={event.data} timeZone={timeZone} onSaved={event.reload} />
          <EventExtraInfoEditor event={event.data} onSaved={event.reload} />
        </div>
      )}

      {currentStep === 'layout' && event.data && event.data.eventType !== 'Open' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border border-border bg-card shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-border/20 px-6 py-4">
              <CardTitle className="text-base font-bold font-display text-foreground flex items-center gap-2">
                <LayoutGrid className="h-4.5 w-4.5 text-primary" /> Event Tables
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Admin reuses a catalog table type and overrides values; cannot create new types. */}
              <div className="flex flex-wrap items-end gap-3 p-4 border border-border/50 bg-muted/20 rounded-xl">
                <div className="space-y-1.5">
                  <Label className="text-[10px]">Table Type</Label>
                  <Select
                    className="h-9 w-48 text-xs bg-background"
                    value={tableTemplateId}
                    onChange={(e) => selectTemplate(e.target.value)}
                  >
                    <option value="">— select —</option>
                    {templateList.map((t) => (
                      <option key={t.tableTemplatesId} value={t.tableTemplatesId}>
                        {t.name}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px]">Table Name</Label>
                  <Input className="h-9 w-32 text-xs bg-background" value={tableLabel} disabled readOnly />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px]">Color</Label>
                  <span
                    className="flex h-9 w-14 items-center justify-center rounded-md border border-input bg-background"
                    title="Inherited from the catalog table type"
                  >
                    <span className="size-5 rounded-sm" style={{ backgroundColor: tableColor || 'transparent' }} />
                  </span>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px]">Capacity</Label>
                  <Input
                    type="number"
                    className="h-9 w-20 text-xs bg-background"
                    disabled={!tableTemplateId}
                    value={tableCapacity}
                    onChange={(e) => setTableCapacity(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px]">Price (USD)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    className="h-9 w-28 text-xs bg-background"
                    disabled={!tableTemplateId}
                    value={centsToUsdInput(tablePriceCents)}
                    onChange={(e) => setTablePriceCents(usdToCents(e.target.value))}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px]">Width (px)</Label>
                  <Input className="h-9 w-20 text-xs bg-background" type="number" value={tableWidth} disabled readOnly />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px]">Height (px)</Label>
                  <Input className="h-9 w-20 text-xs bg-background" type="number" value={tableHeight} disabled readOnly />
                </div>
                <div className="flex items-center h-9 px-2 text-xs font-semibold text-muted-foreground">
                  <input type="checkbox" className="mr-2" checked={tableIsAllInclusive} disabled readOnly />
                  All-inclusive
                </div>
                <Button
                  size="sm"
                  disabled={!tableTemplateId}
                  className="svyne-spring-btn h-9 px-4 rounded-lg font-bold text-xs"
                  onClick={() =>
                    guard(
                      () =>
                        createEventTable({
                          eventsId,
                          label: tableLabel,
                          capacity: tableCapacity,
                          // Empty = inherit the catalog template's default shape.
                          shape: '',
                          color: tableColor,
                          priceCents: tablePriceCents,
                          feeFormulasId: '',
                          isAllInclusive: tableIsAllInclusive,
                          perAttendeeCents: tablePerAttendeeCents,
                          tableTemplatesId: tableTemplateId,
                          width: tableWidth,
                          height: tableHeight,
                        }).then(() => {
                          setTableTemplateId('');
                          setTableLabel('');
                          setTableColor('');
                          setFloorKey((k) => k + 1);
                          setPricingKey((k) => k + 1);
                        }),
                      tableTypes.reload,
                    )
                  }
                >
                  Add table
                </Button>
              </div>
              <div className="space-y-2">
                {typeList.map((type) => (
                  <div key={type.eventTablesId} className="flex items-center justify-between border border-border/50 bg-card rounded-lg px-4 py-3 shadow-sm">
                    <span className="flex items-center gap-3">
                      <span className="inline-block size-4 rounded shadow-sm border border-black/10" style={{ backgroundColor: type.color }} />
                      <span className="font-bold text-sm">{type.label}</span>
                      <span className="text-xs font-semibold text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">{centsToUSD(type.priceCents)}</span>
                      {type.platformFeeCents > 0 ? (
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          + fee {centsToUSD(type.platformFeeCents)} ={' '}
                          <span className="text-foreground">{centsToUSD(addCents(type.priceCents, type.platformFeeCents))}</span>
                        </span>
                      ) : null}
                      {lockedTypeIds.has(type.eventTablesId) ? (
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">🔒 In use</span>
                      ) : null}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 text-xs font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive"
                      disabled={lockedTypeIds.has(type.eventTablesId)}
                      title={lockedTypeIds.has(type.eventTablesId) ? 'Has sold or held tables — can’t be removed' : undefined}
                      onClick={() =>
                        guard(
                          () =>
                            deleteEventTable(type.eventTablesId).then(() => {
                              setFloorKey((k) => k + 1);
                              setPricingKey((k) => k + 1);
                            }),
                          tableTypes.reload,
                        )
                      }
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <FloorPlanPanel
            key={`floor-${floorKey}`}
            eventsId={eventsId}
            onTypesChanged={() => setPricingKey((k) => k + 1)}
            onLayoutSaved={() => {
              tableTypes.reload();
              stats.reload();
            }}
          />
        </div>
      )}

      {currentStep === 'pricing' && event.data && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <PricingManager
            key={`pricing-${pricingKey}`}
            eventsId={eventsId}
            eventType={event.data.eventType || 'Open'}
            timeZone={timeZone}
          />
          {event.data.eventType !== 'Table' ? (
            <TicketTypesManager eventsId={eventsId} />
          ) : null}
        </div>
      )}



      {currentStep === 'timeline' && event.data && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <EventMediaManager eventsId={eventsId} />
          
          <EventCatalogLinks
            eventsId={eventsId}
            performersJson={event.data.performersJson}
            sponsorsJson={event.data.sponsorsJson}
            onChanged={event.reload}
          />
          
          <ScheduleTimeline
            eventsId={eventsId}
            eventStart={event.data.startDate}
            eventEnd={event.data.endDate}
            timeZone={timeZone}
          />
        </div>
      )}

      {currentStep === 'staff' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border border-border bg-card shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-border/20 px-6 py-4">
              <CardTitle className="text-base font-bold font-display text-foreground flex items-center gap-2">
                <UserCog className="h-4.5 w-4.5 text-primary" /> Staff & Assignments
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end gap-3 p-4 border border-border/50 bg-muted/20 rounded-xl">
                <div className="space-y-1.5 flex-1">
                  <Label className="text-[10px]">Staff Email</Label>
                  <Input
                    type="email"
                    placeholder="staff@example.com"
                    value={assignEmail}
                    onChange={(e) => setAssignEmail(e.target.value)}
                    className="h-10 bg-background text-sm"
                  />
                </div>
                <Button
                  className="svyne-spring-btn h-10 px-6 rounded-lg font-bold text-xs"
                  onClick={() => {
                    if (!assignEmail.trim()) return;
                    guard(async () => {
                      const res = await assignStaffByEmail(assignEmail.trim(), eventsId);
                      if (res.userExisted) {
                        toast.success('Staff member assigned successfully.');
                      } else {
                        toast.success(res.message);
                      }
                      setAssignEmail('');
                    }, staff.reload);
                  }}
                >
                  Assign staff
                </Button>
              </div>
              <div className="space-y-2">
                {(staff.data ?? []).map((member) => (
                  <div key={member.usersId} className="flex items-center justify-between border border-border/50 bg-card rounded-lg px-4 py-3 shadow-sm">
                    <span className="font-semibold text-sm">
                      {member.firstName || member.lastName 
                        ? `${member.firstName} ${member.lastName}`.trim() 
                        : 'Invited User'} 
                      <span className="text-muted-foreground ml-2 font-normal">{member.email}</span>
                    </span>
                    <Button size="sm" variant="ghost" className="h-8 text-xs font-semibold text-destructive hover:bg-destructive/10" onClick={() => guard(() => unassignStaff(member.usersId, eventsId), staff.reload)}>
                      Unassign
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {currentStep === 'preview' && event.data && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border border-border bg-card shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-border/20 px-6 py-4">
              <CardTitle className="text-base font-bold font-display text-foreground flex items-center gap-2">
                <Eye className="h-4.5 w-4.5 text-primary" /> Branded Event Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <EventBrandingPreview eventName={event.data.title} />
            </CardContent>
          </Card>
        </div>
      )}

      {currentStep === 'publish' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-muted/40 border border-border rounded-2xl p-8 text-center space-y-4">
            <h2 className="font-display text-2xl font-bold">Review &amp; Publish</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Once everything is configured, you can publish your event to make it visible to customers and start accepting bookings.
            </p>
            <Button
              size="lg"
              className={cn("svyne-spring-btn h-12 px-8 rounded-xl font-bold uppercase tracking-wider text-sm shadow-md shadow-primary/20 mt-4", event.data?.status === 'Published' && "opacity-50 cursor-not-allowed")}
              disabled={!canPublish || event.data?.status === 'Published'}
              onClick={() => guard(() => changeEventStatus(eventsId, 'Published'), event.reload)}
            >
              {event.data?.status === 'Published' ? "Already Published" : "Publish Event Now"}
            </Button>
          </div>

          {stats.data ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <Stat icon={CalendarCheck2} label="Bookings" value={stats.data.totalBookings} />
              <Stat icon={Ticket} label="Tickets sold" value={stats.data.ticketsSold} />
              <Stat icon={TicketCheck} label="Checked in" value={stats.data.checkedIn} />
              <Stat icon={DollarSign} label="Revenue" value={centsToUSD(stats.data.revenueCents)} accent />
            </div>
          ) : null}
        </div>
      )}

      {/* Stepper Footer Navigation */}
      {event.data && (
        <div className="flex items-center justify-between border-t border-border/20 pt-6 mt-12 pb-8">
          <Button
            variant="outline"
            className={cn("h-11 px-6 rounded-xl font-bold text-xs border-border bg-card", currentStep === STEPS[0].id ? "invisible" : "")}
            onClick={goPrev}
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Previous Step
          </Button>
          <Button
            className={cn("svyne-spring-btn h-11 px-8 rounded-xl font-bold uppercase tracking-wider text-xs shadow-md shadow-primary/20", currentStep === STEPS[STEPS.length - 1].id ? "invisible" : "")}
            onClick={goNext}
          >
            Next Step <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

function EditSection({
  event,
  timeZone,
  onSaved,
}: {
  event: Event;
  timeZone: string;
  onSaved: () => void;
}) {
  const venuesLoader = useCallback(() => listVenues(), []);
  const venues = useAsync(venuesLoader);
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [category, setCategory] = useState(event.category);
  const [eventType, setEventType] = useState(event.eventType || 'Open');
  const [venuesId, setVenuesId] = useState(event.venuesId);
  const [feesIncluded, setFeesIncluded] = useState(event.feesIncluded);
  const [start, setStart] = useState(epochToZonedInput(event.startDate, timeZone));
  const [end, setEnd] = useState(epochToZonedInput(event.endDate, timeZone));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function toggleFeesIncluded(next: boolean) {
    setFeesIncluded(next);
    try {
      await setEventFeesIncluded(event.eventsId, next);
    } catch (caught) {
      setFeesIncluded(!next);
      setError(rpcErrorMessage(caught));
    }
  }

  async function save() {
    setSaving(true);
    setError(null);
    try {
      await updateEvent(event.eventsId, {
        title,
        slug: event.slug,
        description,
        status: event.status,
        category,
        startDate: zonedInputToEpoch(start, timeZone),
        endDate: zonedInputToEpoch(end, timeZone),
        // Open has no floor plan; Table/Both need the grid layout.
        layoutMode: eventType === 'Open' ? 'Open' : 'Grid',
        eventType,
        venuesId,
        imagePath: event.imagePath,
      });
      onSaved();
    } catch (caught) {
      setError(rpcErrorMessage(caught));
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className="border border-border bg-card shadow-sm rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-border/20 px-6 py-4">
        <CardTitle className="text-base font-bold font-display text-foreground flex items-center gap-2">
          <FileEdit className="h-4.5 w-4.5 text-primary" /> Edit Details
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 p-6">
        <div className="space-y-1.5">
          <Label className="text-[10px]">Title</Label>
          <div className="svyne-spring-input">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} className="h-10 bg-background border-border text-sm" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-[10px]">Category</Label>
          <div className="svyne-spring-input">
            <Input value={category} onChange={(e) => setCategory(e.target.value)} className="h-10 bg-background border-border text-sm" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-[10px]">Event capacity</Label>
          <div className="svyne-spring-input">
            <Input type="number" value={event.totalCapacity} readOnly disabled className="h-10 bg-background border-border text-sm" />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-[10px]">Event type</Label>
          <Select value={eventType} onChange={(e) => setEventType(e.target.value)} className="h-10 bg-background border-border text-sm">
            <option value="Open">Open seating (ticket tiers)</option>
            <option value="Table">Table based (floor plan)</option>
            <option value="Both">Both (tiers + tables)</option>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-[10px]">Venue</Label>
          <Select value={venuesId} onChange={(e) => setVenuesId(e.target.value)} className="h-10 bg-background border-border text-sm">
            <option value="">— select venue —</option>
            {(venues.data ?? [])
              .filter((v) => v.isActive || v.venuesId === venuesId)
              .map((v) => (
                <option key={v.venuesId} value={v.venuesId}>
                  {v.name}
                </option>
              ))}
          </Select>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between">
            <Label className="text-[10px]">Event starts</Label>
            <span className="text-[10px] text-muted-foreground uppercase">Times in {zoneAbbrev(timeZone)}</span>
          </div>
          <DateTimePicker value={start} onChange={setStart} timeZone={timeZone} />
        </div>
        <div className="space-y-1.5">
          <Label className="text-[10px]">Event ends</Label>
          <DateTimePicker value={end} onChange={setEnd} timeZone={timeZone} />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <Label className="text-[10px]">Description</Label>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} className="h-10 bg-background border-border text-sm" />
        </div>
        <div className="md:col-span-2 p-4 rounded-xl border border-border/50 bg-muted/20">
          <label className="flex items-start gap-3 text-sm cursor-pointer">
            <input
              type="checkbox"
              className="mt-1"
              checked={feesIncluded}
              onChange={(e) => toggleFeesIncluded(e.target.checked)}
            />
            <span>
              <span className="font-bold text-sm block">Show fees included in price</span>
              <span className="block text-xs text-muted-foreground mt-1 leading-relaxed">
                On = buyers see one all-in total. Off = price + fee shown separately. The developer fee amount is
                unchanged either way.
              </span>
            </span>
          </label>
        </div>
        {error ? <p className="text-[10px] font-bold text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-2.5 leading-normal animate-shake md:col-span-2">{error}</p> : null}
        
        <div className="md:col-span-2 flex justify-end border-t border-border/10 pt-4 mt-2">
          <Button onClick={save} disabled={saving} className="svyne-spring-btn h-11 px-8 rounded-xl font-bold uppercase tracking-wider text-xs shadow-md shadow-primary/20">
            {saving ? 'Saving…' : 'Save details'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: LucideIcon;
  label: string;
  value: number | string;
  accent?: boolean;
}) {
  return (
    <Card className={cn('relative overflow-hidden border border-border shadow-sm rounded-2xl', accent && 'border-amber/40 bg-amber/5')}>
      <CardContent className="space-y-2 p-6">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'flex size-10 items-center justify-center rounded-xl [&_svg]:size-5 shadow-sm border border-black/5',
              accent ? 'bg-amber/20 text-amber-600' : 'bg-primary/10 text-primary',
            )}
          >
            <Icon />
          </span>
          <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{label}</p>
        </div>
        <p className="font-display text-3xl font-extrabold tracking-tight">{value}</p>
      </CardContent>
    </Card>
  );
}
