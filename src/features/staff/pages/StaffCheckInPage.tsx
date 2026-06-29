import { useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAsync } from '@/shared/hooks/useAsync';
import {
  scanTicket,
  getCheckInStats,
  getGuestList,
  checkInGuest,
} from '@/features/staff/services/staffService';
import { rpcErrorMessage } from '@/shared/session';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Select } from '@/shared/ui/select';
import {
  Search,
  Scan,
  Users,
  CheckCircle2,
  ArrowLeft,
  XCircle,
  FileCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

export function StaffCheckInPage() {
  const { eventsId = '' } = useParams();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [qrToken, setQrToken] = useState('');
  const [manualCode, setManualCode] = useState('');
  const [manualType, setManualType] = useState<'Booking' | 'Ticket'>('Ticket');
  const [checkingIn, setCheckingIn] = useState(false);

  // Load guest list & stats
  const guestListLoader = useCallback(() => getGuestList(eventsId), [eventsId]);
  const guestList = useAsync(guestListLoader);

  const statsLoader = useCallback(() => getCheckInStats(eventsId), [eventsId]);
  const stats = useAsync(statsLoader);

  // Auto-reload stats/guest list on successful check-in
  const reloadAll = useCallback(() => {
    guestList.reload();
    stats.reload();
  }, [guestList, stats]);

  const notAuthorized = !!(guestList.error && guestList.error.includes('Not Authorized'));

  async function handleScan(e: React.FormEvent) {
    e.preventDefault();
    if (!qrToken.trim()) return;

    setCheckingIn(true);
    try {
      const res = await scanTicket(qrToken.trim(), eventsId);
      if (res.valid) {
        toast.success(`Success: Checked in ${res.holderName || 'Guest'}`);
        setQrToken('');
        reloadAll();
      } else {
        toast.error(res.message || 'Check-in failed.');
      }
    } catch (err) {
      toast.error(rpcErrorMessage(err));
    } finally {
      setCheckingIn(false);
    }
  }

  async function handleManualCheckIn(e: React.FormEvent) {
    e.preventDefault();
    if (!manualCode.trim()) return;

    setCheckingIn(true);
    try {
      const res = await checkInGuest(eventsId, manualCode.trim(), manualType);
      if (res.valid) {
        toast.success(`Success: Checked in ${res.holderName || 'Guest'}`);
        setManualCode('');
        reloadAll();
      } else {
        toast.error(res.message || 'Check-in failed.');
      }
    } catch (err) {
      toast.error(rpcErrorMessage(err));
    } finally {
      setCheckingIn(false);
    }
  }

  async function handleActionCheckIn(codeOrId: string, type: 'Booking' | 'Ticket') {
    setCheckingIn(true);
    try {
      const res = await checkInGuest(eventsId, codeOrId, type);
      if (res.valid) {
        toast.success(`Checked in successfully!`);
        reloadAll();
      } else {
        toast.error(res.message || 'Check-in failed.');
      }
    } catch (err) {
      toast.error(rpcErrorMessage(err));
    } finally {
      setCheckingIn(false);
    }
  }

  // Filter guest bookings/tickets
  const filteredBookings = (guestList.data ?? []).filter((b) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    const matchesBooking =
      b.bookingNumber.toLowerCase().includes(query) ||
      b.buyerName.toLowerCase().includes(query);

    const matchesTicket = b.tickets.some(
      (t) =>
        t.ticketCode.toLowerCase().includes(query) ||
        t.guestName.toLowerCase().includes(query),
    );

    return matchesBooking || matchesTicket;
  });

  if (notAuthorized) {
    return (
      <div className="max-w-md mx-auto mt-16 text-center space-y-6">
        <div className="inline-flex p-4 bg-destructive/10 rounded-full text-destructive">
          <XCircle className="h-12 w-12" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Not Authorized</h2>
          <p className="text-muted-foreground text-sm">
            You do not have access to this event check-in, or the current time is outside the allowed window (24 hours before event start to 24 hours after event end).
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate('/staff')} className="w-full">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Staff Portal
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
        <div className="space-y-1">
          <Button variant="ghost" size="sm" onClick={() => navigate('/staff')} className="-ml-2 mb-1 gap-1 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" /> Portal Home
          </Button>
          <h1 className="font-display text-xl font-bold tracking-tight md:text-2xl flex items-center gap-2">
            <Scan className="h-5 w-5 text-primary" />
            Check-In Desk
          </h1>
        </div>
        {stats.data && (
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-sm font-semibold">
              {stats.data.checkedIn} Checked In
            </div>
            <div className="bg-muted text-muted-foreground px-3 py-1.5 rounded-lg text-sm font-semibold">
              {stats.data.remaining} Remaining
            </div>
          </div>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Scanners and Inputs */}
        <div className="space-y-6 md:col-span-1">
          {/* Simulated QR Scan */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Scan className="h-4 w-4 text-primary" />
                Scan Ticket QR
              </CardTitle>
              <p className="text-sm text-muted-foreground">Simulate a camera scanner input.</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleScan} className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="qr-input">Scan Token</Label>
                  <Input
                    id="qr-input"
                    placeholder="Enter QR token hash..."
                    value={qrToken}
                    onChange={(e) => setQrToken(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full gap-1.5" disabled={checkingIn}>
                  <FileCheck className="h-4 w-4" /> Check In Token
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Manual Check-In Form */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Manual Lookup Check-In
              </CardTitle>
              <p className="text-sm text-muted-foreground">Check in using Booking or Ticket ID.</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleManualCheckIn} className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="manual-type">Type</Label>
                  <Select
                    id="manual-type"
                    value={manualType}
                    onChange={(e) => setManualType(e.target.value as 'Booking' | 'Ticket')}
                  >
                    <option value="Ticket">Single Ticket</option>
                    <option value="Booking">Whole Booking</option>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="manual-code">Code / Number</Label>
                  <Input
                    id="manual-code"
                    placeholder={manualType === 'Ticket' ? "Enter Ticket Code..." : "Enter Booking Number..."}
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" variant="outline" className="w-full" disabled={checkingIn}>
                  Check In Manual
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Guest List Panel */}
        <div className="md:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by buyer name, guest name, booking number, or ticket code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-card"
            />
          </div>

          <Card className="shadow-sm overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Guest List
              </CardTitle>
              <p className="text-sm text-muted-foreground">Click to check in bookings or individual tickets.</p>
            </CardHeader>
            <CardContent className="p-0">
              {guestList.loading ? (
                <p className="text-muted-foreground text-center py-12">Loading guest list...</p>
              ) : guestList.error ? (
                <p className="text-destructive text-center py-12">{guestList.error}</p>
              ) : filteredBookings.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground space-y-2">
                  <Sparkles className="h-8 w-8 mx-auto text-muted-foreground/60" />
                  <p>No matching guests found.</p>
                </div>
              ) : (
                <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
                  {filteredBookings.map((b) => (
                    <div key={b.bookingsId} className="p-4 space-y-3 hover:bg-muted/10 transition-colors">
                      {/* Booking Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b pb-2 border-dashed">
                        <div>
                          <p className="font-semibold text-sm text-foreground">
                            {b.buyerName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Booking Number: <span className="font-mono">{b.bookingNumber}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                            b.status === 'CheckedIn' ? 'bg-success/15 text-success' : 'bg-primary/10 text-primary'
                          }`}>
                            {b.status}
                          </span>
                          {b.status !== 'CheckedIn' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleActionCheckIn(b.bookingsId, 'Booking')}
                              disabled={checkingIn}
                              className="h-7 text-xs font-semibold"
                            >
                              Check In All
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Tickets list */}
                      <div className="pl-2 space-y-2">
                        {b.tickets.map((t) => (
                          <div key={t.ticketsId} className="flex items-center justify-between py-1 text-xs">
                            <div className="space-y-0.5">
                              <p className="font-medium">
                                Seat #{t.seatNumber} : {t.guestName}
                              </p>
                              <p className="text-[10px] text-muted-foreground font-mono">
                                Ticket Code: {t.ticketCode}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {t.status === 'CheckedIn' ? (
                                <span className="text-[10px] font-semibold text-success flex items-center gap-1">
                                  <CheckCircle2 className="h-3 w-3" /> Checked In
                                </span>
                              ) : (
                                <>
                                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                                    t.status === 'Claimed' ? 'bg-amber/15 text-amber-foreground' : 'bg-muted text-muted-foreground'
                                  }`}>
                                    {t.status}
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleActionCheckIn(t.ticketsId, 'Ticket')}
                                    disabled={checkingIn}
                                    className="h-6 px-2 text-[10px] hover:bg-primary/10 hover:text-primary"
                                  >
                                    Check In <ChevronRight className="h-3 w-3 ml-0.5" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
