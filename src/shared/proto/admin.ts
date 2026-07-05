



import { AckResponse } from "./common";
import { UuidValue } from "./common";
import { Empty } from "./common";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { PageRequest } from "./common";
import { PageMeta } from "./common";

export interface AdminDashboard {
    
    totalEvents: number;
    
    activeEvents: number;
    
    totalRevenueCents: string;
    
    totalAttendees: number;
}

export interface DeveloperDashboard {
    
    totalTenants: number;
    
    totalUsers: number;
    
    platformRevenueCents: string;
}

export interface MonthlyReportRequest {
    
    eventsId: string;
    
    year: number;
    
    month: number;
}

export interface MonthlyReport {
    
    grossCents: string;
    
    feesCents: string;
    
    netCents: string;
    
    ticketsSold: number;
}

export interface StripeStatus {
    
    chargesEnabled: boolean;
    
    payoutsEnabled: boolean;
    
    detailsSubmitted: boolean;
    
    bankLast4: string;
}

export interface StripeOnboardingLink {
    
    url: string;
}

export interface StaffMember {
    
    usersId: string;
    
    firstName: string;
    
    lastName: string;
    
    email: string;
    
    role: number;
}

export interface ListStaffResponse {
    
    staff: StaffMember[];
}

export interface AssignStaffRequest {
    
    usersId: string;
    
    eventsId: string;
}

export interface CreateInvitationRequest {
    
    email: string;
    
    role: number;
    
    eventsId: string;
}

export interface AssignStaffByEmailRequest {
    
    email: string;
    
    eventsId: string;
    
    role: number;
}

export interface AssignStaffByEmailResponse {
    
    userExisted: boolean;
    
    message: string;
}

export interface AddOrInviteStaffRequest {
    
    email: string;
}

export interface AddOrInviteStaffResponse {
    
    userExisted: boolean;
    
    usersId: string;
    
    message: string;
}

export interface AcceptInvitationRequest {
    
    token: string;
    
    password: string;
    
    firstName: string;
    
    lastName: string;
}

export interface Invitation {
    
    invitationsId: string;
    
    email: string;
    
    role: number;
    
    status: string;
    
    expiresAt: string;
}

export interface ListInvitationsResponse {
    
    invitations: Invitation[];
    
    meta?: PageMeta;
}

export interface LogQuery {
    
    page?: PageRequest;
    
    action: string;
    
    entityType: string;
    
    from: string;
    
    to: string;
    
    eventsId: string;
}

export interface LogEntry {
    
    id: string;
    
    timestamp: string;
    
    action: string;
    
    entityType: string;
    
    actorEmail: string;
    
    detail: string;
    
    eventsId: string;
}

export interface LogPage {
    
    entries: LogEntry[];
    
    meta?: PageMeta;
}

export interface ErrorLogQuery {
    
    page?: PageRequest;
    
    severity: string;
    
    source: string;
    
    resolvedFilter: number;
    
    search: string;
    
    from: string;
    
    to: string;
}

export interface ErrorLogEntry {
    
    id: string;
    
    timestamp: string;
    
    severity: string;
    
    message: string;
    
    exceptionType: string;
    
    stackTrace: string;
    
    requestPath: string;
    
    requestMethod: string;
    
    statusCode: number;
    
    usersId: string;
    
    tenantsId: string;
    
    ipAddress: string;
    
    correlationId: string;
    
    source: string;
    
    resolved: boolean;
    
    resolvedNotes: string;
    
    resolvedBy: string;
    
    resolvedAt: string;
    
    metadataJson: string;
}

export interface ErrorLogPage {
    
    entries: ErrorLogEntry[];
    
    meta?: PageMeta;
}

export interface ErrorLogCount {
    
    key: string;
    
    count: number;
}

export interface ErrorLogStats {
    
    totalToday: number;
    
    totalWeek: number;
    
    totalMonth: number;
    
    unresolved: number;
    
    bySeverity: ErrorLogCount[];
    
    daily: ErrorLogCount[];
    
    topTypes: ErrorLogCount[];
    
    topTenants: ErrorLogCount[];
}

export interface ResolveErrorLogRequest {
    
    errorLogId: string;
    
    notes: string;
}

export interface ClientErrorReport {
    
    errorType: string;
    
    message: string;
    
    stackTrace: string;
    
    severity: string;
    
    pageUrl: string;
    
    previousUrl: string;
    
    screenSize: string;
    
    viewportSize: string;
    
    sessionId: string;
    
    breadcrumbsJson: string;
    
    occurredAt: string;
}

export interface ClientErrorBatch {
    
    reports: ClientErrorReport[];
}

export interface CreateFeedbackRequest {
    
    name: string;
    
    email: string;
    
    type: string;
    
    message: string;
    
    rating: number;
    
    diagnosticsJson: string;
}

export interface Feedback {
    
    feedbacksId: string;
    
    name: string;
    
    type: string;
    
    message: string;
    
    rating: number;
    
    createdAt: string;
}

export interface ListFeedbackResponse {
    
    feedback: Feedback[];
    
    meta?: PageMeta;
}

export interface HealthStatus {
    
    status: string;
    
    database: boolean;
    
    redis: boolean;
}

class AdminDashboard$Type extends MessageType<AdminDashboard> {
    constructor() {
        super("svyne.admin.AdminDashboard", [
            { no: 1, name: "total_events", kind: "scalar", T: 5  },
            { no: 2, name: "active_events", kind: "scalar", T: 5  },
            { no: 3, name: "total_revenue_cents", kind: "scalar", T: 3  },
            { no: 4, name: "total_attendees", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<AdminDashboard>): AdminDashboard {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.totalEvents = 0;
        message.activeEvents = 0;
        message.totalRevenueCents = "0";
        message.totalAttendees = 0;
        if (value !== undefined)
            reflectionMergePartial<AdminDashboard>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: AdminDashboard): AdminDashboard {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.totalEvents = reader.int32();
                    break;
                case  2:
                    message.activeEvents = reader.int32();
                    break;
                case  3:
                    message.totalRevenueCents = reader.int64().toString();
                    break;
                case  4:
                    message.totalAttendees = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: AdminDashboard, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.totalEvents !== 0)
            writer.tag(1, WireType.Varint).int32(message.totalEvents);
        
        if (message.activeEvents !== 0)
            writer.tag(2, WireType.Varint).int32(message.activeEvents);
        
        if (message.totalRevenueCents !== "0")
            writer.tag(3, WireType.Varint).int64(message.totalRevenueCents);
        
        if (message.totalAttendees !== 0)
            writer.tag(4, WireType.Varint).int32(message.totalAttendees);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const AdminDashboard = new AdminDashboard$Type();

class DeveloperDashboard$Type extends MessageType<DeveloperDashboard> {
    constructor() {
        super("svyne.admin.DeveloperDashboard", [
            { no: 1, name: "total_tenants", kind: "scalar", T: 5  },
            { no: 2, name: "total_users", kind: "scalar", T: 5  },
            { no: 3, name: "platform_revenue_cents", kind: "scalar", T: 3  }
        ]);
    }
    create(value?: PartialMessage<DeveloperDashboard>): DeveloperDashboard {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.totalTenants = 0;
        message.totalUsers = 0;
        message.platformRevenueCents = "0";
        if (value !== undefined)
            reflectionMergePartial<DeveloperDashboard>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: DeveloperDashboard): DeveloperDashboard {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.totalTenants = reader.int32();
                    break;
                case  2:
                    message.totalUsers = reader.int32();
                    break;
                case  3:
                    message.platformRevenueCents = reader.int64().toString();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: DeveloperDashboard, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.totalTenants !== 0)
            writer.tag(1, WireType.Varint).int32(message.totalTenants);
        
        if (message.totalUsers !== 0)
            writer.tag(2, WireType.Varint).int32(message.totalUsers);
        
        if (message.platformRevenueCents !== "0")
            writer.tag(3, WireType.Varint).int64(message.platformRevenueCents);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const DeveloperDashboard = new DeveloperDashboard$Type();

class MonthlyReportRequest$Type extends MessageType<MonthlyReportRequest> {
    constructor() {
        super("svyne.admin.MonthlyReportRequest", [
            { no: 1, name: "events_id", kind: "scalar", T: 9  },
            { no: 2, name: "year", kind: "scalar", T: 5  },
            { no: 3, name: "month", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<MonthlyReportRequest>): MonthlyReportRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.eventsId = "";
        message.year = 0;
        message.month = 0;
        if (value !== undefined)
            reflectionMergePartial<MonthlyReportRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: MonthlyReportRequest): MonthlyReportRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.eventsId = reader.string();
                    break;
                case  2:
                    message.year = reader.int32();
                    break;
                case  3:
                    message.month = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: MonthlyReportRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.eventsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.year !== 0)
            writer.tag(2, WireType.Varint).int32(message.year);
        
        if (message.month !== 0)
            writer.tag(3, WireType.Varint).int32(message.month);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const MonthlyReportRequest = new MonthlyReportRequest$Type();

class MonthlyReport$Type extends MessageType<MonthlyReport> {
    constructor() {
        super("svyne.admin.MonthlyReport", [
            { no: 1, name: "gross_cents", kind: "scalar", T: 3  },
            { no: 2, name: "fees_cents", kind: "scalar", T: 3  },
            { no: 3, name: "net_cents", kind: "scalar", T: 3  },
            { no: 4, name: "tickets_sold", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<MonthlyReport>): MonthlyReport {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.grossCents = "0";
        message.feesCents = "0";
        message.netCents = "0";
        message.ticketsSold = 0;
        if (value !== undefined)
            reflectionMergePartial<MonthlyReport>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: MonthlyReport): MonthlyReport {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.grossCents = reader.int64().toString();
                    break;
                case  2:
                    message.feesCents = reader.int64().toString();
                    break;
                case  3:
                    message.netCents = reader.int64().toString();
                    break;
                case  4:
                    message.ticketsSold = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: MonthlyReport, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.grossCents !== "0")
            writer.tag(1, WireType.Varint).int64(message.grossCents);
        
        if (message.feesCents !== "0")
            writer.tag(2, WireType.Varint).int64(message.feesCents);
        
        if (message.netCents !== "0")
            writer.tag(3, WireType.Varint).int64(message.netCents);
        
        if (message.ticketsSold !== 0)
            writer.tag(4, WireType.Varint).int32(message.ticketsSold);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const MonthlyReport = new MonthlyReport$Type();

class StripeStatus$Type extends MessageType<StripeStatus> {
    constructor() {
        super("svyne.admin.StripeStatus", [
            { no: 1, name: "charges_enabled", kind: "scalar", T: 8  },
            { no: 2, name: "payouts_enabled", kind: "scalar", T: 8  },
            { no: 3, name: "details_submitted", kind: "scalar", T: 8  },
            { no: 4, name: "bank_last4", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<StripeStatus>): StripeStatus {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.chargesEnabled = false;
        message.payoutsEnabled = false;
        message.detailsSubmitted = false;
        message.bankLast4 = "";
        if (value !== undefined)
            reflectionMergePartial<StripeStatus>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: StripeStatus): StripeStatus {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.chargesEnabled = reader.bool();
                    break;
                case  2:
                    message.payoutsEnabled = reader.bool();
                    break;
                case  3:
                    message.detailsSubmitted = reader.bool();
                    break;
                case  4:
                    message.bankLast4 = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: StripeStatus, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.chargesEnabled !== false)
            writer.tag(1, WireType.Varint).bool(message.chargesEnabled);
        
        if (message.payoutsEnabled !== false)
            writer.tag(2, WireType.Varint).bool(message.payoutsEnabled);
        
        if (message.detailsSubmitted !== false)
            writer.tag(3, WireType.Varint).bool(message.detailsSubmitted);
        
        if (message.bankLast4 !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.bankLast4);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const StripeStatus = new StripeStatus$Type();

class StripeOnboardingLink$Type extends MessageType<StripeOnboardingLink> {
    constructor() {
        super("svyne.admin.StripeOnboardingLink", [
            { no: 1, name: "url", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<StripeOnboardingLink>): StripeOnboardingLink {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.url = "";
        if (value !== undefined)
            reflectionMergePartial<StripeOnboardingLink>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: StripeOnboardingLink): StripeOnboardingLink {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.url = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: StripeOnboardingLink, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.url !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.url);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const StripeOnboardingLink = new StripeOnboardingLink$Type();

class StaffMember$Type extends MessageType<StaffMember> {
    constructor() {
        super("svyne.admin.StaffMember", [
            { no: 1, name: "users_id", kind: "scalar", T: 9  },
            { no: 2, name: "first_name", kind: "scalar", T: 9  },
            { no: 3, name: "last_name", kind: "scalar", T: 9  },
            { no: 4, name: "email", kind: "scalar", T: 9  },
            { no: 5, name: "role", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<StaffMember>): StaffMember {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.usersId = "";
        message.firstName = "";
        message.lastName = "";
        message.email = "";
        message.role = 0;
        if (value !== undefined)
            reflectionMergePartial<StaffMember>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: StaffMember): StaffMember {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.usersId = reader.string();
                    break;
                case  2:
                    message.firstName = reader.string();
                    break;
                case  3:
                    message.lastName = reader.string();
                    break;
                case  4:
                    message.email = reader.string();
                    break;
                case  5:
                    message.role = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: StaffMember, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.usersId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.usersId);
        
        if (message.firstName !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.firstName);
        
        if (message.lastName !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.lastName);
        
        if (message.email !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.email);
        
        if (message.role !== 0)
            writer.tag(5, WireType.Varint).int32(message.role);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const StaffMember = new StaffMember$Type();

class ListStaffResponse$Type extends MessageType<ListStaffResponse> {
    constructor() {
        super("svyne.admin.ListStaffResponse", [
            { no: 1, name: "staff", kind: "message", repeat: 2 , T: () => StaffMember }
        ]);
    }
    create(value?: PartialMessage<ListStaffResponse>): ListStaffResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.staff = [];
        if (value !== undefined)
            reflectionMergePartial<ListStaffResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListStaffResponse): ListStaffResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.staff.push(StaffMember.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ListStaffResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.staff.length; i++)
            StaffMember.internalBinaryWrite(message.staff[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ListStaffResponse = new ListStaffResponse$Type();

class AssignStaffRequest$Type extends MessageType<AssignStaffRequest> {
    constructor() {
        super("svyne.admin.AssignStaffRequest", [
            { no: 1, name: "users_id", kind: "scalar", T: 9  },
            { no: 2, name: "events_id", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<AssignStaffRequest>): AssignStaffRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.usersId = "";
        message.eventsId = "";
        if (value !== undefined)
            reflectionMergePartial<AssignStaffRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: AssignStaffRequest): AssignStaffRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.usersId = reader.string();
                    break;
                case  2:
                    message.eventsId = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: AssignStaffRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.usersId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.usersId);
        
        if (message.eventsId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.eventsId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const AssignStaffRequest = new AssignStaffRequest$Type();

class CreateInvitationRequest$Type extends MessageType<CreateInvitationRequest> {
    constructor() {
        super("svyne.admin.CreateInvitationRequest", [
            { no: 1, name: "email", kind: "scalar", T: 9  },
            { no: 2, name: "role", kind: "scalar", T: 5  },
            { no: 3, name: "events_id", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<CreateInvitationRequest>): CreateInvitationRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.email = "";
        message.role = 0;
        message.eventsId = "";
        if (value !== undefined)
            reflectionMergePartial<CreateInvitationRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreateInvitationRequest): CreateInvitationRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.email = reader.string();
                    break;
                case  2:
                    message.role = reader.int32();
                    break;
                case  3:
                    message.eventsId = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: CreateInvitationRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.email !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.email);
        
        if (message.role !== 0)
            writer.tag(2, WireType.Varint).int32(message.role);
        
        if (message.eventsId !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.eventsId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const CreateInvitationRequest = new CreateInvitationRequest$Type();

class AssignStaffByEmailRequest$Type extends MessageType<AssignStaffByEmailRequest> {
    constructor() {
        super("svyne.admin.AssignStaffByEmailRequest", [
            { no: 1, name: "email", kind: "scalar", T: 9  },
            { no: 2, name: "events_id", kind: "scalar", T: 9  },
            { no: 3, name: "role", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<AssignStaffByEmailRequest>): AssignStaffByEmailRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.email = "";
        message.eventsId = "";
        message.role = 0;
        if (value !== undefined)
            reflectionMergePartial<AssignStaffByEmailRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: AssignStaffByEmailRequest): AssignStaffByEmailRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.email = reader.string();
                    break;
                case  2:
                    message.eventsId = reader.string();
                    break;
                case  3:
                    message.role = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: AssignStaffByEmailRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.email !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.email);
        
        if (message.eventsId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.eventsId);
        
        if (message.role !== 0)
            writer.tag(3, WireType.Varint).int32(message.role);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const AssignStaffByEmailRequest = new AssignStaffByEmailRequest$Type();

class AssignStaffByEmailResponse$Type extends MessageType<AssignStaffByEmailResponse> {
    constructor() {
        super("svyne.admin.AssignStaffByEmailResponse", [
            { no: 1, name: "user_existed", kind: "scalar", T: 8  },
            { no: 2, name: "message", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<AssignStaffByEmailResponse>): AssignStaffByEmailResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.userExisted = false;
        message.message = "";
        if (value !== undefined)
            reflectionMergePartial<AssignStaffByEmailResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: AssignStaffByEmailResponse): AssignStaffByEmailResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.userExisted = reader.bool();
                    break;
                case  2:
                    message.message = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: AssignStaffByEmailResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.userExisted !== false)
            writer.tag(1, WireType.Varint).bool(message.userExisted);
        
        if (message.message !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.message);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const AssignStaffByEmailResponse = new AssignStaffByEmailResponse$Type();

class AddOrInviteStaffRequest$Type extends MessageType<AddOrInviteStaffRequest> {
    constructor() {
        super("svyne.admin.AddOrInviteStaffRequest", [
            { no: 1, name: "email", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<AddOrInviteStaffRequest>): AddOrInviteStaffRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.email = "";
        if (value !== undefined)
            reflectionMergePartial<AddOrInviteStaffRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: AddOrInviteStaffRequest): AddOrInviteStaffRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.email = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: AddOrInviteStaffRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.email !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.email);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const AddOrInviteStaffRequest = new AddOrInviteStaffRequest$Type();

class AddOrInviteStaffResponse$Type extends MessageType<AddOrInviteStaffResponse> {
    constructor() {
        super("svyne.admin.AddOrInviteStaffResponse", [
            { no: 1, name: "user_existed", kind: "scalar", T: 8  },
            { no: 2, name: "users_id", kind: "scalar", T: 9  },
            { no: 3, name: "message", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<AddOrInviteStaffResponse>): AddOrInviteStaffResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.userExisted = false;
        message.usersId = "";
        message.message = "";
        if (value !== undefined)
            reflectionMergePartial<AddOrInviteStaffResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: AddOrInviteStaffResponse): AddOrInviteStaffResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.userExisted = reader.bool();
                    break;
                case  2:
                    message.usersId = reader.string();
                    break;
                case  3:
                    message.message = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: AddOrInviteStaffResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.userExisted !== false)
            writer.tag(1, WireType.Varint).bool(message.userExisted);
        
        if (message.usersId !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.usersId);
        
        if (message.message !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.message);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const AddOrInviteStaffResponse = new AddOrInviteStaffResponse$Type();

class AcceptInvitationRequest$Type extends MessageType<AcceptInvitationRequest> {
    constructor() {
        super("svyne.admin.AcceptInvitationRequest", [
            { no: 1, name: "token", kind: "scalar", T: 9  },
            { no: 2, name: "password", kind: "scalar", T: 9  },
            { no: 3, name: "first_name", kind: "scalar", T: 9  },
            { no: 4, name: "last_name", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<AcceptInvitationRequest>): AcceptInvitationRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.token = "";
        message.password = "";
        message.firstName = "";
        message.lastName = "";
        if (value !== undefined)
            reflectionMergePartial<AcceptInvitationRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: AcceptInvitationRequest): AcceptInvitationRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.token = reader.string();
                    break;
                case  2:
                    message.password = reader.string();
                    break;
                case  3:
                    message.firstName = reader.string();
                    break;
                case  4:
                    message.lastName = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: AcceptInvitationRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.token !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.token);
        
        if (message.password !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.password);
        
        if (message.firstName !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.firstName);
        
        if (message.lastName !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.lastName);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const AcceptInvitationRequest = new AcceptInvitationRequest$Type();

class Invitation$Type extends MessageType<Invitation> {
    constructor() {
        super("svyne.admin.Invitation", [
            { no: 1, name: "invitations_id", kind: "scalar", T: 9  },
            { no: 2, name: "email", kind: "scalar", T: 9  },
            { no: 3, name: "role", kind: "scalar", T: 5  },
            { no: 4, name: "status", kind: "scalar", T: 9  },
            { no: 5, name: "expires_at", kind: "scalar", T: 3  }
        ]);
    }
    create(value?: PartialMessage<Invitation>): Invitation {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.invitationsId = "";
        message.email = "";
        message.role = 0;
        message.status = "";
        message.expiresAt = "0";
        if (value !== undefined)
            reflectionMergePartial<Invitation>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Invitation): Invitation {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.invitationsId = reader.string();
                    break;
                case  2:
                    message.email = reader.string();
                    break;
                case  3:
                    message.role = reader.int32();
                    break;
                case  4:
                    message.status = reader.string();
                    break;
                case  5:
                    message.expiresAt = reader.int64().toString();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Invitation, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.invitationsId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.invitationsId);
        
        if (message.email !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.email);
        
        if (message.role !== 0)
            writer.tag(3, WireType.Varint).int32(message.role);
        
        if (message.status !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.status);
        
        if (message.expiresAt !== "0")
            writer.tag(5, WireType.Varint).int64(message.expiresAt);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const Invitation = new Invitation$Type();

class ListInvitationsResponse$Type extends MessageType<ListInvitationsResponse> {
    constructor() {
        super("svyne.admin.ListInvitationsResponse", [
            { no: 1, name: "invitations", kind: "message", repeat: 2 , T: () => Invitation },
            { no: 2, name: "meta", kind: "message", T: () => PageMeta }
        ]);
    }
    create(value?: PartialMessage<ListInvitationsResponse>): ListInvitationsResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.invitations = [];
        if (value !== undefined)
            reflectionMergePartial<ListInvitationsResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListInvitationsResponse): ListInvitationsResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.invitations.push(Invitation.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case  2:
                    message.meta = PageMeta.internalBinaryRead(reader, reader.uint32(), options, message.meta);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ListInvitationsResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.invitations.length; i++)
            Invitation.internalBinaryWrite(message.invitations[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        
        if (message.meta)
            PageMeta.internalBinaryWrite(message.meta, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ListInvitationsResponse = new ListInvitationsResponse$Type();

class LogQuery$Type extends MessageType<LogQuery> {
    constructor() {
        super("svyne.admin.LogQuery", [
            { no: 1, name: "page", kind: "message", T: () => PageRequest },
            { no: 2, name: "action", kind: "scalar", T: 9  },
            { no: 3, name: "entity_type", kind: "scalar", T: 9  },
            { no: 4, name: "from", kind: "scalar", T: 3  },
            { no: 5, name: "to", kind: "scalar", T: 3  },
            { no: 6, name: "events_id", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<LogQuery>): LogQuery {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.action = "";
        message.entityType = "";
        message.from = "0";
        message.to = "0";
        message.eventsId = "";
        if (value !== undefined)
            reflectionMergePartial<LogQuery>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: LogQuery): LogQuery {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.page = PageRequest.internalBinaryRead(reader, reader.uint32(), options, message.page);
                    break;
                case  2:
                    message.action = reader.string();
                    break;
                case  3:
                    message.entityType = reader.string();
                    break;
                case  4:
                    message.from = reader.int64().toString();
                    break;
                case  5:
                    message.to = reader.int64().toString();
                    break;
                case  6:
                    message.eventsId = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: LogQuery, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.page)
            PageRequest.internalBinaryWrite(message.page, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        
        if (message.action !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.action);
        
        if (message.entityType !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.entityType);
        
        if (message.from !== "0")
            writer.tag(4, WireType.Varint).int64(message.from);
        
        if (message.to !== "0")
            writer.tag(5, WireType.Varint).int64(message.to);
        
        if (message.eventsId !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.eventsId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const LogQuery = new LogQuery$Type();

class LogEntry$Type extends MessageType<LogEntry> {
    constructor() {
        super("svyne.admin.LogEntry", [
            { no: 1, name: "id", kind: "scalar", T: 9  },
            { no: 2, name: "timestamp", kind: "scalar", T: 3  },
            { no: 3, name: "action", kind: "scalar", T: 9  },
            { no: 4, name: "entity_type", kind: "scalar", T: 9  },
            { no: 5, name: "actor_email", kind: "scalar", T: 9  },
            { no: 6, name: "detail", kind: "scalar", T: 9  },
            { no: 7, name: "events_id", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<LogEntry>): LogEntry {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.id = "";
        message.timestamp = "0";
        message.action = "";
        message.entityType = "";
        message.actorEmail = "";
        message.detail = "";
        message.eventsId = "";
        if (value !== undefined)
            reflectionMergePartial<LogEntry>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: LogEntry): LogEntry {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.id = reader.string();
                    break;
                case  2:
                    message.timestamp = reader.int64().toString();
                    break;
                case  3:
                    message.action = reader.string();
                    break;
                case  4:
                    message.entityType = reader.string();
                    break;
                case  5:
                    message.actorEmail = reader.string();
                    break;
                case  6:
                    message.detail = reader.string();
                    break;
                case  7:
                    message.eventsId = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: LogEntry, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.id !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.id);
        
        if (message.timestamp !== "0")
            writer.tag(2, WireType.Varint).int64(message.timestamp);
        
        if (message.action !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.action);
        
        if (message.entityType !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.entityType);
        
        if (message.actorEmail !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.actorEmail);
        
        if (message.detail !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.detail);
        
        if (message.eventsId !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.eventsId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const LogEntry = new LogEntry$Type();

class LogPage$Type extends MessageType<LogPage> {
    constructor() {
        super("svyne.admin.LogPage", [
            { no: 1, name: "entries", kind: "message", repeat: 2 , T: () => LogEntry },
            { no: 2, name: "meta", kind: "message", T: () => PageMeta }
        ]);
    }
    create(value?: PartialMessage<LogPage>): LogPage {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.entries = [];
        if (value !== undefined)
            reflectionMergePartial<LogPage>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: LogPage): LogPage {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.entries.push(LogEntry.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case  2:
                    message.meta = PageMeta.internalBinaryRead(reader, reader.uint32(), options, message.meta);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: LogPage, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.entries.length; i++)
            LogEntry.internalBinaryWrite(message.entries[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        
        if (message.meta)
            PageMeta.internalBinaryWrite(message.meta, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const LogPage = new LogPage$Type();

class ErrorLogQuery$Type extends MessageType<ErrorLogQuery> {
    constructor() {
        super("svyne.admin.ErrorLogQuery", [
            { no: 1, name: "page", kind: "message", T: () => PageRequest },
            { no: 2, name: "severity", kind: "scalar", T: 9  },
            { no: 3, name: "source", kind: "scalar", T: 9  },
            { no: 4, name: "resolved_filter", kind: "scalar", T: 5  },
            { no: 5, name: "search", kind: "scalar", T: 9  },
            { no: 6, name: "from", kind: "scalar", T: 3  },
            { no: 7, name: "to", kind: "scalar", T: 3  }
        ]);
    }
    create(value?: PartialMessage<ErrorLogQuery>): ErrorLogQuery {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.severity = "";
        message.source = "";
        message.resolvedFilter = 0;
        message.search = "";
        message.from = "0";
        message.to = "0";
        if (value !== undefined)
            reflectionMergePartial<ErrorLogQuery>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ErrorLogQuery): ErrorLogQuery {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.page = PageRequest.internalBinaryRead(reader, reader.uint32(), options, message.page);
                    break;
                case  2:
                    message.severity = reader.string();
                    break;
                case  3:
                    message.source = reader.string();
                    break;
                case  4:
                    message.resolvedFilter = reader.int32();
                    break;
                case  5:
                    message.search = reader.string();
                    break;
                case  6:
                    message.from = reader.int64().toString();
                    break;
                case  7:
                    message.to = reader.int64().toString();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ErrorLogQuery, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.page)
            PageRequest.internalBinaryWrite(message.page, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        
        if (message.severity !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.severity);
        
        if (message.source !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.source);
        
        if (message.resolvedFilter !== 0)
            writer.tag(4, WireType.Varint).int32(message.resolvedFilter);
        
        if (message.search !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.search);
        
        if (message.from !== "0")
            writer.tag(6, WireType.Varint).int64(message.from);
        
        if (message.to !== "0")
            writer.tag(7, WireType.Varint).int64(message.to);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ErrorLogQuery = new ErrorLogQuery$Type();

class ErrorLogEntry$Type extends MessageType<ErrorLogEntry> {
    constructor() {
        super("svyne.admin.ErrorLogEntry", [
            { no: 1, name: "id", kind: "scalar", T: 9  },
            { no: 2, name: "timestamp", kind: "scalar", T: 3  },
            { no: 3, name: "severity", kind: "scalar", T: 9  },
            { no: 4, name: "message", kind: "scalar", T: 9  },
            { no: 5, name: "exception_type", kind: "scalar", T: 9  },
            { no: 6, name: "stack_trace", kind: "scalar", T: 9  },
            { no: 7, name: "request_path", kind: "scalar", T: 9  },
            { no: 8, name: "request_method", kind: "scalar", T: 9  },
            { no: 9, name: "status_code", kind: "scalar", T: 5  },
            { no: 10, name: "users_id", kind: "scalar", T: 9  },
            { no: 11, name: "tenants_id", kind: "scalar", T: 9  },
            { no: 12, name: "ip_address", kind: "scalar", T: 9  },
            { no: 13, name: "correlation_id", kind: "scalar", T: 9  },
            { no: 14, name: "source", kind: "scalar", T: 9  },
            { no: 15, name: "resolved", kind: "scalar", T: 8  },
            { no: 16, name: "resolved_notes", kind: "scalar", T: 9  },
            { no: 17, name: "resolved_by", kind: "scalar", T: 9  },
            { no: 18, name: "resolved_at", kind: "scalar", T: 3  },
            { no: 19, name: "metadata_json", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<ErrorLogEntry>): ErrorLogEntry {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.id = "";
        message.timestamp = "0";
        message.severity = "";
        message.message = "";
        message.exceptionType = "";
        message.stackTrace = "";
        message.requestPath = "";
        message.requestMethod = "";
        message.statusCode = 0;
        message.usersId = "";
        message.tenantsId = "";
        message.ipAddress = "";
        message.correlationId = "";
        message.source = "";
        message.resolved = false;
        message.resolvedNotes = "";
        message.resolvedBy = "";
        message.resolvedAt = "0";
        message.metadataJson = "";
        if (value !== undefined)
            reflectionMergePartial<ErrorLogEntry>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ErrorLogEntry): ErrorLogEntry {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.id = reader.string();
                    break;
                case  2:
                    message.timestamp = reader.int64().toString();
                    break;
                case  3:
                    message.severity = reader.string();
                    break;
                case  4:
                    message.message = reader.string();
                    break;
                case  5:
                    message.exceptionType = reader.string();
                    break;
                case  6:
                    message.stackTrace = reader.string();
                    break;
                case  7:
                    message.requestPath = reader.string();
                    break;
                case  8:
                    message.requestMethod = reader.string();
                    break;
                case  9:
                    message.statusCode = reader.int32();
                    break;
                case  10:
                    message.usersId = reader.string();
                    break;
                case  11:
                    message.tenantsId = reader.string();
                    break;
                case  12:
                    message.ipAddress = reader.string();
                    break;
                case  13:
                    message.correlationId = reader.string();
                    break;
                case  14:
                    message.source = reader.string();
                    break;
                case  15:
                    message.resolved = reader.bool();
                    break;
                case  16:
                    message.resolvedNotes = reader.string();
                    break;
                case  17:
                    message.resolvedBy = reader.string();
                    break;
                case  18:
                    message.resolvedAt = reader.int64().toString();
                    break;
                case  19:
                    message.metadataJson = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ErrorLogEntry, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.id !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.id);
        
        if (message.timestamp !== "0")
            writer.tag(2, WireType.Varint).int64(message.timestamp);
        
        if (message.severity !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.severity);
        
        if (message.message !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.message);
        
        if (message.exceptionType !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.exceptionType);
        
        if (message.stackTrace !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.stackTrace);
        
        if (message.requestPath !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.requestPath);
        
        if (message.requestMethod !== "")
            writer.tag(8, WireType.LengthDelimited).string(message.requestMethod);
        
        if (message.statusCode !== 0)
            writer.tag(9, WireType.Varint).int32(message.statusCode);
        
        if (message.usersId !== "")
            writer.tag(10, WireType.LengthDelimited).string(message.usersId);
        
        if (message.tenantsId !== "")
            writer.tag(11, WireType.LengthDelimited).string(message.tenantsId);
        
        if (message.ipAddress !== "")
            writer.tag(12, WireType.LengthDelimited).string(message.ipAddress);
        
        if (message.correlationId !== "")
            writer.tag(13, WireType.LengthDelimited).string(message.correlationId);
        
        if (message.source !== "")
            writer.tag(14, WireType.LengthDelimited).string(message.source);
        
        if (message.resolved !== false)
            writer.tag(15, WireType.Varint).bool(message.resolved);
        
        if (message.resolvedNotes !== "")
            writer.tag(16, WireType.LengthDelimited).string(message.resolvedNotes);
        
        if (message.resolvedBy !== "")
            writer.tag(17, WireType.LengthDelimited).string(message.resolvedBy);
        
        if (message.resolvedAt !== "0")
            writer.tag(18, WireType.Varint).int64(message.resolvedAt);
        
        if (message.metadataJson !== "")
            writer.tag(19, WireType.LengthDelimited).string(message.metadataJson);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ErrorLogEntry = new ErrorLogEntry$Type();

class ErrorLogPage$Type extends MessageType<ErrorLogPage> {
    constructor() {
        super("svyne.admin.ErrorLogPage", [
            { no: 1, name: "entries", kind: "message", repeat: 2 , T: () => ErrorLogEntry },
            { no: 2, name: "meta", kind: "message", T: () => PageMeta }
        ]);
    }
    create(value?: PartialMessage<ErrorLogPage>): ErrorLogPage {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.entries = [];
        if (value !== undefined)
            reflectionMergePartial<ErrorLogPage>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ErrorLogPage): ErrorLogPage {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.entries.push(ErrorLogEntry.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case  2:
                    message.meta = PageMeta.internalBinaryRead(reader, reader.uint32(), options, message.meta);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ErrorLogPage, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.entries.length; i++)
            ErrorLogEntry.internalBinaryWrite(message.entries[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        
        if (message.meta)
            PageMeta.internalBinaryWrite(message.meta, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ErrorLogPage = new ErrorLogPage$Type();

class ErrorLogCount$Type extends MessageType<ErrorLogCount> {
    constructor() {
        super("svyne.admin.ErrorLogCount", [
            { no: 1, name: "key", kind: "scalar", T: 9  },
            { no: 2, name: "count", kind: "scalar", T: 5  }
        ]);
    }
    create(value?: PartialMessage<ErrorLogCount>): ErrorLogCount {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.key = "";
        message.count = 0;
        if (value !== undefined)
            reflectionMergePartial<ErrorLogCount>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ErrorLogCount): ErrorLogCount {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.key = reader.string();
                    break;
                case  2:
                    message.count = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ErrorLogCount, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.key !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.key);
        
        if (message.count !== 0)
            writer.tag(2, WireType.Varint).int32(message.count);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ErrorLogCount = new ErrorLogCount$Type();

class ErrorLogStats$Type extends MessageType<ErrorLogStats> {
    constructor() {
        super("svyne.admin.ErrorLogStats", [
            { no: 1, name: "total_today", kind: "scalar", T: 5  },
            { no: 2, name: "total_week", kind: "scalar", T: 5  },
            { no: 3, name: "total_month", kind: "scalar", T: 5  },
            { no: 4, name: "unresolved", kind: "scalar", T: 5  },
            { no: 5, name: "by_severity", kind: "message", repeat: 2 , T: () => ErrorLogCount },
            { no: 6, name: "daily", kind: "message", repeat: 2 , T: () => ErrorLogCount },
            { no: 7, name: "top_types", kind: "message", repeat: 2 , T: () => ErrorLogCount },
            { no: 8, name: "top_tenants", kind: "message", repeat: 2 , T: () => ErrorLogCount }
        ]);
    }
    create(value?: PartialMessage<ErrorLogStats>): ErrorLogStats {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.totalToday = 0;
        message.totalWeek = 0;
        message.totalMonth = 0;
        message.unresolved = 0;
        message.bySeverity = [];
        message.daily = [];
        message.topTypes = [];
        message.topTenants = [];
        if (value !== undefined)
            reflectionMergePartial<ErrorLogStats>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ErrorLogStats): ErrorLogStats {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.totalToday = reader.int32();
                    break;
                case  2:
                    message.totalWeek = reader.int32();
                    break;
                case  3:
                    message.totalMonth = reader.int32();
                    break;
                case  4:
                    message.unresolved = reader.int32();
                    break;
                case  5:
                    message.bySeverity.push(ErrorLogCount.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case  6:
                    message.daily.push(ErrorLogCount.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case  7:
                    message.topTypes.push(ErrorLogCount.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case  8:
                    message.topTenants.push(ErrorLogCount.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ErrorLogStats, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.totalToday !== 0)
            writer.tag(1, WireType.Varint).int32(message.totalToday);
        
        if (message.totalWeek !== 0)
            writer.tag(2, WireType.Varint).int32(message.totalWeek);
        
        if (message.totalMonth !== 0)
            writer.tag(3, WireType.Varint).int32(message.totalMonth);
        
        if (message.unresolved !== 0)
            writer.tag(4, WireType.Varint).int32(message.unresolved);
        
        for (let i = 0; i < message.bySeverity.length; i++)
            ErrorLogCount.internalBinaryWrite(message.bySeverity[i], writer.tag(5, WireType.LengthDelimited).fork(), options).join();
        
        for (let i = 0; i < message.daily.length; i++)
            ErrorLogCount.internalBinaryWrite(message.daily[i], writer.tag(6, WireType.LengthDelimited).fork(), options).join();
        
        for (let i = 0; i < message.topTypes.length; i++)
            ErrorLogCount.internalBinaryWrite(message.topTypes[i], writer.tag(7, WireType.LengthDelimited).fork(), options).join();
        
        for (let i = 0; i < message.topTenants.length; i++)
            ErrorLogCount.internalBinaryWrite(message.topTenants[i], writer.tag(8, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ErrorLogStats = new ErrorLogStats$Type();

class ResolveErrorLogRequest$Type extends MessageType<ResolveErrorLogRequest> {
    constructor() {
        super("svyne.admin.ResolveErrorLogRequest", [
            { no: 1, name: "error_log_id", kind: "scalar", T: 9  },
            { no: 2, name: "notes", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<ResolveErrorLogRequest>): ResolveErrorLogRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.errorLogId = "";
        message.notes = "";
        if (value !== undefined)
            reflectionMergePartial<ResolveErrorLogRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ResolveErrorLogRequest): ResolveErrorLogRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.errorLogId = reader.string();
                    break;
                case  2:
                    message.notes = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ResolveErrorLogRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.errorLogId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.errorLogId);
        
        if (message.notes !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.notes);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ResolveErrorLogRequest = new ResolveErrorLogRequest$Type();

class ClientErrorReport$Type extends MessageType<ClientErrorReport> {
    constructor() {
        super("svyne.admin.ClientErrorReport", [
            { no: 1, name: "error_type", kind: "scalar", T: 9  },
            { no: 2, name: "message", kind: "scalar", T: 9  },
            { no: 3, name: "stack_trace", kind: "scalar", T: 9  },
            { no: 4, name: "severity", kind: "scalar", T: 9  },
            { no: 5, name: "page_url", kind: "scalar", T: 9  },
            { no: 6, name: "previous_url", kind: "scalar", T: 9  },
            { no: 7, name: "screen_size", kind: "scalar", T: 9  },
            { no: 8, name: "viewport_size", kind: "scalar", T: 9  },
            { no: 9, name: "session_id", kind: "scalar", T: 9  },
            { no: 10, name: "breadcrumbs_json", kind: "scalar", T: 9  },
            { no: 11, name: "occurred_at", kind: "scalar", T: 3  }
        ]);
    }
    create(value?: PartialMessage<ClientErrorReport>): ClientErrorReport {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.errorType = "";
        message.message = "";
        message.stackTrace = "";
        message.severity = "";
        message.pageUrl = "";
        message.previousUrl = "";
        message.screenSize = "";
        message.viewportSize = "";
        message.sessionId = "";
        message.breadcrumbsJson = "";
        message.occurredAt = "0";
        if (value !== undefined)
            reflectionMergePartial<ClientErrorReport>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ClientErrorReport): ClientErrorReport {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.errorType = reader.string();
                    break;
                case  2:
                    message.message = reader.string();
                    break;
                case  3:
                    message.stackTrace = reader.string();
                    break;
                case  4:
                    message.severity = reader.string();
                    break;
                case  5:
                    message.pageUrl = reader.string();
                    break;
                case  6:
                    message.previousUrl = reader.string();
                    break;
                case  7:
                    message.screenSize = reader.string();
                    break;
                case  8:
                    message.viewportSize = reader.string();
                    break;
                case  9:
                    message.sessionId = reader.string();
                    break;
                case  10:
                    message.breadcrumbsJson = reader.string();
                    break;
                case  11:
                    message.occurredAt = reader.int64().toString();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ClientErrorReport, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.errorType !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.errorType);
        
        if (message.message !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.message);
        
        if (message.stackTrace !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.stackTrace);
        
        if (message.severity !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.severity);
        
        if (message.pageUrl !== "")
            writer.tag(5, WireType.LengthDelimited).string(message.pageUrl);
        
        if (message.previousUrl !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.previousUrl);
        
        if (message.screenSize !== "")
            writer.tag(7, WireType.LengthDelimited).string(message.screenSize);
        
        if (message.viewportSize !== "")
            writer.tag(8, WireType.LengthDelimited).string(message.viewportSize);
        
        if (message.sessionId !== "")
            writer.tag(9, WireType.LengthDelimited).string(message.sessionId);
        
        if (message.breadcrumbsJson !== "")
            writer.tag(10, WireType.LengthDelimited).string(message.breadcrumbsJson);
        
        if (message.occurredAt !== "0")
            writer.tag(11, WireType.Varint).int64(message.occurredAt);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ClientErrorReport = new ClientErrorReport$Type();

class ClientErrorBatch$Type extends MessageType<ClientErrorBatch> {
    constructor() {
        super("svyne.admin.ClientErrorBatch", [
            { no: 1, name: "reports", kind: "message", repeat: 2 , T: () => ClientErrorReport }
        ]);
    }
    create(value?: PartialMessage<ClientErrorBatch>): ClientErrorBatch {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.reports = [];
        if (value !== undefined)
            reflectionMergePartial<ClientErrorBatch>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ClientErrorBatch): ClientErrorBatch {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.reports.push(ClientErrorReport.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ClientErrorBatch, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.reports.length; i++)
            ClientErrorReport.internalBinaryWrite(message.reports[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ClientErrorBatch = new ClientErrorBatch$Type();

class CreateFeedbackRequest$Type extends MessageType<CreateFeedbackRequest> {
    constructor() {
        super("svyne.admin.CreateFeedbackRequest", [
            { no: 1, name: "name", kind: "scalar", T: 9  },
            { no: 2, name: "email", kind: "scalar", T: 9  },
            { no: 3, name: "type", kind: "scalar", T: 9  },
            { no: 4, name: "message", kind: "scalar", T: 9  },
            { no: 5, name: "rating", kind: "scalar", T: 5  },
            { no: 6, name: "diagnostics_json", kind: "scalar", T: 9  }
        ]);
    }
    create(value?: PartialMessage<CreateFeedbackRequest>): CreateFeedbackRequest {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.name = "";
        message.email = "";
        message.type = "";
        message.message = "";
        message.rating = 0;
        message.diagnosticsJson = "";
        if (value !== undefined)
            reflectionMergePartial<CreateFeedbackRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CreateFeedbackRequest): CreateFeedbackRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.name = reader.string();
                    break;
                case  2:
                    message.email = reader.string();
                    break;
                case  3:
                    message.type = reader.string();
                    break;
                case  4:
                    message.message = reader.string();
                    break;
                case  5:
                    message.rating = reader.int32();
                    break;
                case  6:
                    message.diagnosticsJson = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: CreateFeedbackRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.name !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.name);
        
        if (message.email !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.email);
        
        if (message.type !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.type);
        
        if (message.message !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.message);
        
        if (message.rating !== 0)
            writer.tag(5, WireType.Varint).int32(message.rating);
        
        if (message.diagnosticsJson !== "")
            writer.tag(6, WireType.LengthDelimited).string(message.diagnosticsJson);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const CreateFeedbackRequest = new CreateFeedbackRequest$Type();

class Feedback$Type extends MessageType<Feedback> {
    constructor() {
        super("svyne.admin.Feedback", [
            { no: 1, name: "feedbacks_id", kind: "scalar", T: 9  },
            { no: 2, name: "name", kind: "scalar", T: 9  },
            { no: 3, name: "type", kind: "scalar", T: 9  },
            { no: 4, name: "message", kind: "scalar", T: 9  },
            { no: 5, name: "rating", kind: "scalar", T: 5  },
            { no: 6, name: "created_at", kind: "scalar", T: 3  }
        ]);
    }
    create(value?: PartialMessage<Feedback>): Feedback {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.feedbacksId = "";
        message.name = "";
        message.type = "";
        message.message = "";
        message.rating = 0;
        message.createdAt = "0";
        if (value !== undefined)
            reflectionMergePartial<Feedback>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Feedback): Feedback {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.feedbacksId = reader.string();
                    break;
                case  2:
                    message.name = reader.string();
                    break;
                case  3:
                    message.type = reader.string();
                    break;
                case  4:
                    message.message = reader.string();
                    break;
                case  5:
                    message.rating = reader.int32();
                    break;
                case  6:
                    message.createdAt = reader.int64().toString();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Feedback, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.feedbacksId !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.feedbacksId);
        
        if (message.name !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        
        if (message.type !== "")
            writer.tag(3, WireType.LengthDelimited).string(message.type);
        
        if (message.message !== "")
            writer.tag(4, WireType.LengthDelimited).string(message.message);
        
        if (message.rating !== 0)
            writer.tag(5, WireType.Varint).int32(message.rating);
        
        if (message.createdAt !== "0")
            writer.tag(6, WireType.Varint).int64(message.createdAt);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const Feedback = new Feedback$Type();

class ListFeedbackResponse$Type extends MessageType<ListFeedbackResponse> {
    constructor() {
        super("svyne.admin.ListFeedbackResponse", [
            { no: 1, name: "feedback", kind: "message", repeat: 2 , T: () => Feedback },
            { no: 2, name: "meta", kind: "message", T: () => PageMeta }
        ]);
    }
    create(value?: PartialMessage<ListFeedbackResponse>): ListFeedbackResponse {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.feedback = [];
        if (value !== undefined)
            reflectionMergePartial<ListFeedbackResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ListFeedbackResponse): ListFeedbackResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.feedback.push(Feedback.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                case  2:
                    message.meta = PageMeta.internalBinaryRead(reader, reader.uint32(), options, message.meta);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ListFeedbackResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        for (let i = 0; i < message.feedback.length; i++)
            Feedback.internalBinaryWrite(message.feedback[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        
        if (message.meta)
            PageMeta.internalBinaryWrite(message.meta, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const ListFeedbackResponse = new ListFeedbackResponse$Type();

class HealthStatus$Type extends MessageType<HealthStatus> {
    constructor() {
        super("svyne.admin.HealthStatus", [
            { no: 1, name: "status", kind: "scalar", T: 9  },
            { no: 2, name: "database", kind: "scalar", T: 8  },
            { no: 3, name: "redis", kind: "scalar", T: 8  }
        ]);
    }
    create(value?: PartialMessage<HealthStatus>): HealthStatus {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.status = "";
        message.database = false;
        message.redis = false;
        if (value !== undefined)
            reflectionMergePartial<HealthStatus>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: HealthStatus): HealthStatus {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case  1:
                    message.status = reader.string();
                    break;
                case  2:
                    message.database = reader.bool();
                    break;
                case  3:
                    message.redis = reader.bool();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: HealthStatus, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        
        if (message.status !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.status);
        
        if (message.database !== false)
            writer.tag(2, WireType.Varint).bool(message.database);
        
        if (message.redis !== false)
            writer.tag(3, WireType.Varint).bool(message.redis);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}

export const HealthStatus = new HealthStatus$Type();

export const DashboardService = new ServiceType("svyne.admin.DashboardService", [
    { name: "GetAdminDashboard", options: {}, I: Empty, O: AdminDashboard },
    { name: "GetDeveloperDashboard", options: {}, I: Empty, O: DeveloperDashboard }
]);

export const FinancialService = new ServiceType("svyne.admin.FinancialService", [
    { name: "GetMonthlyReport", options: {}, I: MonthlyReportRequest, O: MonthlyReport },
    { name: "GetStripeStatus", options: {}, I: UuidValue, O: StripeStatus },
    { name: "StartStripeOnboarding", options: {}, I: UuidValue, O: StripeOnboardingLink }
]);

export const StaffService = new ServiceType("svyne.admin.StaffService", [
    { name: "ListStaffForEvent", options: {}, I: UuidValue, O: ListStaffResponse },
    { name: "AssignStaff", options: {}, I: AssignStaffRequest, O: AckResponse },
    { name: "UnassignStaff", options: {}, I: AssignStaffRequest, O: AckResponse },
    { name: "ListAllStaff", options: {}, I: Empty, O: ListStaffResponse },
    { name: "AssignStaffByEmail", options: {}, I: AssignStaffByEmailRequest, O: AssignStaffByEmailResponse },
    { name: "AddOrInviteStaff", options: {}, I: AddOrInviteStaffRequest, O: AddOrInviteStaffResponse },
    { name: "RemoveStaffRole", options: {}, I: UuidValue, O: AckResponse }
]);

export const InvitationService = new ServiceType("svyne.admin.InvitationService", [
    { name: "CreateInvitation", options: {}, I: CreateInvitationRequest, O: UuidValue },
    { name: "AcceptInvitation", options: {}, I: AcceptInvitationRequest, O: AckResponse },
    { name: "RevokeInvitation", options: {}, I: UuidValue, O: AckResponse },
    { name: "ListInvitations", options: {}, I: PageRequest, O: ListInvitationsResponse }
]);

export const LogService = new ServiceType("svyne.admin.LogService", [
    { name: "GetAdminLogs", options: {}, I: LogQuery, O: LogPage },
    { name: "GetDeveloperLogs", options: {}, I: LogQuery, O: LogPage },
    { name: "GetSystemLogs", options: {}, I: LogQuery, O: LogPage },
    { name: "GetErrorLogs", options: {}, I: ErrorLogQuery, O: ErrorLogPage },
    { name: "GetErrorLogStats", options: {}, I: Empty, O: ErrorLogStats },
    { name: "ResolveErrorLog", options: {}, I: ResolveErrorLogRequest, O: AckResponse },
    { name: "ReportClientErrors", options: {}, I: ClientErrorBatch, O: AckResponse }
]);

export const FeedbackService = new ServiceType("svyne.admin.FeedbackService", [
    { name: "CreateFeedback", options: {}, I: CreateFeedbackRequest, O: UuidValue },
    { name: "ListFeedback", options: {}, I: PageRequest, O: ListFeedbackResponse },
    { name: "DeleteFeedback", options: {}, I: UuidValue, O: AckResponse }
]);

export const HealthService = new ServiceType("svyne.admin.HealthService", [
    { name: "Check", options: {}, I: Empty, O: HealthStatus }
]);
