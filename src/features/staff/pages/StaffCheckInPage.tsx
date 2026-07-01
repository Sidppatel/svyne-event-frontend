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
import { cn } from '@/shared/lib/cn';

interface ScanOverlayState {
  show: boolean;
  success: boolean;
  message: string;
}

export function StaffCheckInPage() {
  const { eventsId = '' } = useParams();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [qrToken, setQrToken] = useState('');
  const [manualCode, setManualCode] = useState('');
  const [manualType, setManualType] = useState<'Booking' | 'Ticket'>('Ticket');
  const [checkingIn, setCheckingIn] = useState(false);
  
  // Full-screen bouncer flash overlay state
  const [scanOverlay, setScanOverlay] = useState<ScanOverlayState | null>(null);

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

  const triggerOverlay = (success: boolean, message: string) => {
    setScanOverlay({ show: true, success, message });
    
    // Haptic feedback
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      if (success) {
        navigator.vibrate(150); // Single success pulse
      } else {
        navigator.vibrate([100, 50, 100]); // Double failure pulse
      }
    }
    
    // Clear overlay after 1.5s
    setTimeout(() => {
      setScanOverlay(null);
    }, 1500);
  };

  const notAuthorized = !!(guestList.error && guestList.error.includes('Not Authorized'));

  async function handleScan(e: React.FormEvent) {
    e.preventDefault();
    if (!qrToken.trim()) return;

    setCheckingIn(true);
    try {
      const res = await scanTicket(qrToken.trim(), eventsId);
      if (res.valid) {
        triggerOverlay(true, `Checked In: ${res.holderName || 'Guest'}`);
        setQrToken('');
        reloadAll();
      } else {
        triggerOverlay(false, res.message || 'Check-in failed.');
      }
    } catch (err) {
      triggerOverlay(false, rpcErrorMessage(err));
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
        triggerOverlay(true, `Checked In: ${res.holderName || 'Guest'}`);
        setManualCode('');
        reloadAll();
      } else {
        triggerOverlay(false, res.message || 'Check-in failed.');
      }
    } catch (err) {
      triggerOverlay(false, rpcErrorMessage(err));
    } finally {
      setCheckingIn(false);
    }
  }

  async function handleActionCheckIn(codeOrId: string, type: 'Booking' | 'Ticket') {
    setCheckingIn(true);
    try {
      const res = await checkInGuest(eventsId, codeOrId, type);
      if (res.valid) {
        triggerOverlay(true, `Successfully Checked In!`);
        reloadAll();
      } else {
        triggerOverlay(false, res.message || 'Check-in failed.');
      }
    } catch (err) {
      triggerOverlay(false, rpcErrorMessage(err));
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
        <div className="inline-flex p-4 bg-destructive/10 rounded-full text-destructive border border-destructive/20 animate-shake">
          <XCircle className="h-12 w-12" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-display tracking-tight text-foreground">Not Authorized</h2>
          <p className="text-muted-foreground text-xs leading-normal">
            You do not have access to this event check-in, or the current time is outside the allowed window (24 hours before event start to 24 hours after event end).
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate('/staff')} className="w-full h-11 text-xs">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Staff Portal
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2 relative">
      
      {/* Bouncer Scan Overlay Portal */}
      {scanOverlay && (
        <div className={cn(
          "fixed inset-0 z-50 flex flex-col items-center justify-center animate-fade-in p-6 backdrop-blur-md",
          scanOverlay.success ? "bg-emerald-600/95" : "bg-destructive/95"
        )}>
          <div className="flex flex-col items-center gap-6 text-white text-center">
            {scanOverlay.success ? (
              <CheckCircle2 className="size-32 animate-bounce stroke-[1.5]" />
            ) : (
              <XCircle className="size-32 stroke-[1.5]" />
            )}
            <div className="space-y-2">
              <h2 className="text-4xl font-extrabold tracking-tight font-display uppercase">
                {scanOverlay.success ? 'Valid Ticket' : 'Invalid Ticket'}
              </h2>
              <p className="text-lg font-semibold opacity-90 max-w-md leading-normal">
                {scanOverlay.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/30 pb-4">
        <div className="space-y-1">
          <Button variant="ghost" size="sm" onClick={() => navigate('/staff')} className="-ml-2 mb-1 gap-1 text-muted-foreground hover:bg-muted/30">
            <ArrowLeft className="h-4 w-4" /> Portal Home
          </Button>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Scan className="h-5.5 w-5.5 text-primary" />
            Check-In Desk
          </h1>
        </div>
        {stats.data && (
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-xl text-xs font-bold font-display uppercase tracking-wider">
              {stats.data.checkedIn} Checked In
            </div>
            <div className="bg-card border border-border px-4 py-2 rounded-xl text-xs font-bold text-muted-foreground font-display uppercase tracking-wider">
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
          <Card className="border border-border bg-card shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="pb-3 border-b border-border/20 px-5 py-4">
              <CardTitle className="text-sm font-bold font-display flex items-center gap-2 text-foreground">
                <Scan className="h-4 w-4 text-primary" />
                Scan Ticket QR
              </CardTitle>
              <p className="text-[11px] text-muted-foreground leading-normal">Simulate scanner inputs at the door.</p>
            </CardHeader>
            <CardContent className="p-5">
              <form onSubmit={handleScan} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="qr-input">Scan Token</Label>
                  <Input
                    id="qr-input"
                    placeholder="Enter QR token hash..."
                    value={qrToken}
                    onChange={(e) => setQrToken(e.target.value)}
                    required
                    className="h-10 bg-background/50 border-border focus:border-primary text-sm"
                  />
                </div>
                <Button type="submit" className="w-full h-10 text-xs font-semibold bg-primary hover:bg-primary/95 text-white" disabled={checkingIn}>
                  <FileCheck className="h-4 w-4 mr-1.5" /> Check In Token
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Manual Check-In Form */}
          <Card className="border border-border bg-card shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="pb-3 border-b border-border/20 px-5 py-4">
              <CardTitle className="text-sm font-bold font-display flex items-center gap-2 text-foreground">
                <Users className="h-4 w-4 text-primary" />
                Manual Lookup Check-In
              </CardTitle>
              <p className="text-[11px] text-muted-foreground leading-normal">Override check-in using codes.</p>
            </CardHeader>
            <CardContent className="p-5">
              <form onSubmit={handleManualCheckIn} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="manual-type">Type</Label>
                  <Select
                    id="manual-type"
                    value={manualType}
                    onChange={(e) => setManualType(e.target.value as 'Booking' | 'Ticket')}
                    className="h-10 bg-background/50 border-border"
                  >
                    <option value="Ticket">Single Ticket</option>
                    <option value="Booking">Whole Booking</option>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="manual-code">Code / Number</Label>
                  <Input
                    id="manual-code"
                    placeholder={manualType === 'Ticket' ? "Enter Ticket Code..." : "Enter Booking Number..."}
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    required
                    className="h-10 bg-background/50 border-border focus:border-primary text-sm"
                  />
                </div>
                <Button type="submit" variant="outline" className="w-full h-10 text-xs font-semibold border-border hover:bg-muted" disabled={checkingIn}>
                  Check In Manual
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Guest List Panel */}
        <div className="md:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by buyer name, guest name, booking number, or ticket code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-11 w-full bg-card border-border hover:border-neutral-800 focus:border-primary text-sm rounded-xl shadow-sm"
            />
          </div>

          <Card className="border border-border bg-card shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="pb-3 border-b border-border/20 px-5 py-4">
              <CardTitle className="text-sm font-bold font-display flex items-center gap-2 text-foreground">
                <Users className="h-4 w-4 text-primary" />
                Guest List
              </CardTitle>
              <p className="text-[11px] text-muted-foreground leading-normal">Browse and manage ticket check-ins.</p>
            </CardHeader>
            <CardContent className="p-0">
              {guestList.loading ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-3">
                  <div className="size-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider animate-pulse">Loading guest list...</p>
                </div>
              ) : guestList.error ? (
                <p className="text-destructive text-center py-12 text-xs font-semibold">{guestList.error}</p>
              ) : filteredBookings.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground space-y-3 max-w-sm mx-auto">
                  <div className="inline-flex p-3 bg-muted/40 rounded-full text-muted-foreground/60">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-foreground">No matching guests found</p>
                    <p className="text-[11px] text-muted-foreground leading-normal">Try modifying search tags or check in codes manually.</p>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-border/20 max-h-[600px] overflow-y-auto">
                  {filteredBookings.map((b) => (
                    <div key={b.bookingsId} className="p-4 space-y-3 hover:bg-muted/10 transition-colors">
                      {/* Booking Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b pb-2 border-dashed border-border/20">
                        <div>
                          <p className="font-bold text-sm text-foreground">
                            {b.buyerName}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            Booking: <span className="font-mono text-foreground/80">{b.bookingNumber}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${
                            b.status === 'CheckedIn' 
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/15' 
                              : 'bg-primary/10 text-primary border-primary/15'
                          }`}>
                            {b.status === 'CheckedIn' ? 'All In' : b.status}
                          </span>
                          {b.status !== 'CheckedIn' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleActionCheckIn(b.bookingsId, 'Booking')}
                              disabled={checkingIn}
                              className="h-7 px-3 text-[10px] font-semibold border-border hover:bg-muted"
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
                              <p className="font-semibold text-foreground">
                                Seat #{t.seatNumber} : {t.guestName}
                              </p>
                              <p className="text-[9px] text-muted-foreground font-mono">
                                Ticket Code: {t.ticketCode}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {t.status === 'CheckedIn' ? (
                                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">
                                  <CheckCircle2 className="h-3.5 w-3.5" /> Checked In
                                </span>
                              ) : (
                                <>
                                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                                    t.status === 'Claimed' 
                                      ? 'bg-marigold/10 text-marigold border-marigold/15' 
                                      : 'bg-muted text-muted-foreground border-border'
                                  }`}>
                                    {t.status}
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleActionCheckIn(t.ticketsId, 'Ticket')}
                                    disabled={checkingIn}
                                    className="h-6 px-2 text-[10px] text-primary hover:bg-primary/10 rounded-md"
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
