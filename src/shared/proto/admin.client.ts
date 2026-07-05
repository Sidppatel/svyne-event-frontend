



import { HealthService } from "./admin";
import type { HealthStatus } from "./admin";
import { FeedbackService } from "./admin";
import type { ListFeedbackResponse } from "./admin";
import type { CreateFeedbackRequest } from "./admin";
import { LogService } from "./admin";
import type { ClientErrorBatch } from "./admin";
import type { ResolveErrorLogRequest } from "./admin";
import type { ErrorLogStats } from "./admin";
import type { ErrorLogPage } from "./admin";
import type { ErrorLogQuery } from "./admin";
import type { LogPage } from "./admin";
import type { LogQuery } from "./admin";
import { InvitationService } from "./admin";
import type { ListInvitationsResponse } from "./admin";
import type { PageRequest } from "./common";
import type { AcceptInvitationRequest } from "./admin";
import type { CreateInvitationRequest } from "./admin";
import { StaffService } from "./admin";
import type { AddOrInviteStaffResponse } from "./admin";
import type { AddOrInviteStaffRequest } from "./admin";
import type { AssignStaffByEmailResponse } from "./admin";
import type { AssignStaffByEmailRequest } from "./admin";
import type { AckResponse } from "./common";
import type { AssignStaffRequest } from "./admin";
import type { ListStaffResponse } from "./admin";
import { FinancialService } from "./admin";
import type { StripeOnboardingLink } from "./admin";
import type { StripeStatus } from "./admin";
import type { UuidValue } from "./common";
import type { MonthlyReport } from "./admin";
import type { MonthlyReportRequest } from "./admin";
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { DashboardService } from "./admin";
import type { DeveloperDashboard } from "./admin";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { AdminDashboard } from "./admin";
import type { Empty } from "./common";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";

export interface IDashboardServiceClient {
    
    getAdminDashboard(input: Empty, options?: RpcOptions): UnaryCall<Empty, AdminDashboard>;
    
    getDeveloperDashboard(input: Empty, options?: RpcOptions): UnaryCall<Empty, DeveloperDashboard>;
}

export class DashboardServiceClient implements IDashboardServiceClient, ServiceInfo {
    typeName = DashboardService.typeName;
    methods = DashboardService.methods;
    options = DashboardService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    
    getAdminDashboard(input: Empty, options?: RpcOptions): UnaryCall<Empty, AdminDashboard> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<Empty, AdminDashboard>("unary", this._transport, method, opt, input);
    }
    
    getDeveloperDashboard(input: Empty, options?: RpcOptions): UnaryCall<Empty, DeveloperDashboard> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<Empty, DeveloperDashboard>("unary", this._transport, method, opt, input);
    }
}

export interface IFinancialServiceClient {
    
    getMonthlyReport(input: MonthlyReportRequest, options?: RpcOptions): UnaryCall<MonthlyReportRequest, MonthlyReport>;
    
    getStripeStatus(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, StripeStatus>;
    
    startStripeOnboarding(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, StripeOnboardingLink>;
}

export class FinancialServiceClient implements IFinancialServiceClient, ServiceInfo {
    typeName = FinancialService.typeName;
    methods = FinancialService.methods;
    options = FinancialService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    
    getMonthlyReport(input: MonthlyReportRequest, options?: RpcOptions): UnaryCall<MonthlyReportRequest, MonthlyReport> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<MonthlyReportRequest, MonthlyReport>("unary", this._transport, method, opt, input);
    }
    
    getStripeStatus(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, StripeStatus> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, StripeStatus>("unary", this._transport, method, opt, input);
    }
    
    startStripeOnboarding(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, StripeOnboardingLink> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, StripeOnboardingLink>("unary", this._transport, method, opt, input);
    }
}

export interface IStaffServiceClient {
    
    listStaffForEvent(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, ListStaffResponse>;
    
    assignStaff(input: AssignStaffRequest, options?: RpcOptions): UnaryCall<AssignStaffRequest, AckResponse>;
    
    unassignStaff(input: AssignStaffRequest, options?: RpcOptions): UnaryCall<AssignStaffRequest, AckResponse>;
    
    listAllStaff(input: Empty, options?: RpcOptions): UnaryCall<Empty, ListStaffResponse>;
    
    assignStaffByEmail(input: AssignStaffByEmailRequest, options?: RpcOptions): UnaryCall<AssignStaffByEmailRequest, AssignStaffByEmailResponse>;
    
    addOrInviteStaff(input: AddOrInviteStaffRequest, options?: RpcOptions): UnaryCall<AddOrInviteStaffRequest, AddOrInviteStaffResponse>;
    
    removeStaffRole(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse>;
}

export class StaffServiceClient implements IStaffServiceClient, ServiceInfo {
    typeName = StaffService.typeName;
    methods = StaffService.methods;
    options = StaffService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    
    listStaffForEvent(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, ListStaffResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, ListStaffResponse>("unary", this._transport, method, opt, input);
    }
    
    assignStaff(input: AssignStaffRequest, options?: RpcOptions): UnaryCall<AssignStaffRequest, AckResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<AssignStaffRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    unassignStaff(input: AssignStaffRequest, options?: RpcOptions): UnaryCall<AssignStaffRequest, AckResponse> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<AssignStaffRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    listAllStaff(input: Empty, options?: RpcOptions): UnaryCall<Empty, ListStaffResponse> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<Empty, ListStaffResponse>("unary", this._transport, method, opt, input);
    }
    
    assignStaffByEmail(input: AssignStaffByEmailRequest, options?: RpcOptions): UnaryCall<AssignStaffByEmailRequest, AssignStaffByEmailResponse> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<AssignStaffByEmailRequest, AssignStaffByEmailResponse>("unary", this._transport, method, opt, input);
    }
    
    addOrInviteStaff(input: AddOrInviteStaffRequest, options?: RpcOptions): UnaryCall<AddOrInviteStaffRequest, AddOrInviteStaffResponse> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<AddOrInviteStaffRequest, AddOrInviteStaffResponse>("unary", this._transport, method, opt, input);
    }
    
    removeStaffRole(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse> {
        const method = this.methods[6], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, AckResponse>("unary", this._transport, method, opt, input);
    }
}

export interface IInvitationServiceClient {
    
    createInvitation(input: CreateInvitationRequest, options?: RpcOptions): UnaryCall<CreateInvitationRequest, UuidValue>;
    
    acceptInvitation(input: AcceptInvitationRequest, options?: RpcOptions): UnaryCall<AcceptInvitationRequest, AckResponse>;
    
    revokeInvitation(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse>;
    
    listInvitations(input: PageRequest, options?: RpcOptions): UnaryCall<PageRequest, ListInvitationsResponse>;
}

export class InvitationServiceClient implements IInvitationServiceClient, ServiceInfo {
    typeName = InvitationService.typeName;
    methods = InvitationService.methods;
    options = InvitationService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    
    createInvitation(input: CreateInvitationRequest, options?: RpcOptions): UnaryCall<CreateInvitationRequest, UuidValue> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreateInvitationRequest, UuidValue>("unary", this._transport, method, opt, input);
    }
    
    acceptInvitation(input: AcceptInvitationRequest, options?: RpcOptions): UnaryCall<AcceptInvitationRequest, AckResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<AcceptInvitationRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    revokeInvitation(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    listInvitations(input: PageRequest, options?: RpcOptions): UnaryCall<PageRequest, ListInvitationsResponse> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<PageRequest, ListInvitationsResponse>("unary", this._transport, method, opt, input);
    }
}

export interface ILogServiceClient {
    
    getAdminLogs(input: LogQuery, options?: RpcOptions): UnaryCall<LogQuery, LogPage>;
    
    getDeveloperLogs(input: LogQuery, options?: RpcOptions): UnaryCall<LogQuery, LogPage>;
    
    getSystemLogs(input: LogQuery, options?: RpcOptions): UnaryCall<LogQuery, LogPage>;
    
    getErrorLogs(input: ErrorLogQuery, options?: RpcOptions): UnaryCall<ErrorLogQuery, ErrorLogPage>;
    
    getErrorLogStats(input: Empty, options?: RpcOptions): UnaryCall<Empty, ErrorLogStats>;
    
    resolveErrorLog(input: ResolveErrorLogRequest, options?: RpcOptions): UnaryCall<ResolveErrorLogRequest, AckResponse>;
    
    reportClientErrors(input: ClientErrorBatch, options?: RpcOptions): UnaryCall<ClientErrorBatch, AckResponse>;
}

export class LogServiceClient implements ILogServiceClient, ServiceInfo {
    typeName = LogService.typeName;
    methods = LogService.methods;
    options = LogService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    
    getAdminLogs(input: LogQuery, options?: RpcOptions): UnaryCall<LogQuery, LogPage> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<LogQuery, LogPage>("unary", this._transport, method, opt, input);
    }
    
    getDeveloperLogs(input: LogQuery, options?: RpcOptions): UnaryCall<LogQuery, LogPage> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<LogQuery, LogPage>("unary", this._transport, method, opt, input);
    }
    
    getSystemLogs(input: LogQuery, options?: RpcOptions): UnaryCall<LogQuery, LogPage> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<LogQuery, LogPage>("unary", this._transport, method, opt, input);
    }
    
    getErrorLogs(input: ErrorLogQuery, options?: RpcOptions): UnaryCall<ErrorLogQuery, ErrorLogPage> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<ErrorLogQuery, ErrorLogPage>("unary", this._transport, method, opt, input);
    }
    
    getErrorLogStats(input: Empty, options?: RpcOptions): UnaryCall<Empty, ErrorLogStats> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<Empty, ErrorLogStats>("unary", this._transport, method, opt, input);
    }
    
    resolveErrorLog(input: ResolveErrorLogRequest, options?: RpcOptions): UnaryCall<ResolveErrorLogRequest, AckResponse> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<ResolveErrorLogRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    reportClientErrors(input: ClientErrorBatch, options?: RpcOptions): UnaryCall<ClientErrorBatch, AckResponse> {
        const method = this.methods[6], opt = this._transport.mergeOptions(options);
        return stackIntercept<ClientErrorBatch, AckResponse>("unary", this._transport, method, opt, input);
    }
}

export interface IFeedbackServiceClient {
    
    createFeedback(input: CreateFeedbackRequest, options?: RpcOptions): UnaryCall<CreateFeedbackRequest, UuidValue>;
    
    listFeedback(input: PageRequest, options?: RpcOptions): UnaryCall<PageRequest, ListFeedbackResponse>;
    
    deleteFeedback(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse>;
}

export class FeedbackServiceClient implements IFeedbackServiceClient, ServiceInfo {
    typeName = FeedbackService.typeName;
    methods = FeedbackService.methods;
    options = FeedbackService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    
    createFeedback(input: CreateFeedbackRequest, options?: RpcOptions): UnaryCall<CreateFeedbackRequest, UuidValue> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreateFeedbackRequest, UuidValue>("unary", this._transport, method, opt, input);
    }
    
    listFeedback(input: PageRequest, options?: RpcOptions): UnaryCall<PageRequest, ListFeedbackResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<PageRequest, ListFeedbackResponse>("unary", this._transport, method, opt, input);
    }
    
    deleteFeedback(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, AckResponse>("unary", this._transport, method, opt, input);
    }
}

export interface IHealthServiceClient {
    
    check(input: Empty, options?: RpcOptions): UnaryCall<Empty, HealthStatus>;
}

export class HealthServiceClient implements IHealthServiceClient, ServiceInfo {
    typeName = HealthService.typeName;
    methods = HealthService.methods;
    options = HealthService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    
    check(input: Empty, options?: RpcOptions): UnaryCall<Empty, HealthStatus> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<Empty, HealthStatus>("unary", this._transport, method, opt, input);
    }
}
