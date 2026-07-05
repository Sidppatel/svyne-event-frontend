



import { TenantTierService } from "./reporting";
import type { SetTenantAchRequest } from "./reporting";
import type { SetTenantAdvancedReportingRequest } from "./reporting";
import type { AckResponse } from "./common";
import type { SetTenantTierRequest } from "./reporting";
import type { TenantReportingAccessList } from "./reporting";
import type { PageRequest } from "./common";
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { ReportingService } from "./reporting";
import type { SalesByChannelList } from "./reporting";
import type { TicketTypeBreakdownList } from "./reporting";
import type { EventPerformanceList } from "./reporting";
import type { RevenueTimeseries } from "./reporting";
import type { TimeseriesRequest } from "./reporting";
import type { ReportSummary } from "./reporting";
import type { ReportRangeRequest } from "./reporting";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { ReportingAccess } from "./reporting";
import type { Empty } from "./common";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";

export interface IReportingServiceClient {
    
    getReportingAccess(input: Empty, options?: RpcOptions): UnaryCall<Empty, ReportingAccess>;
    
    getReportSummary(input: ReportRangeRequest, options?: RpcOptions): UnaryCall<ReportRangeRequest, ReportSummary>;
    
    getRevenueTimeseries(input: TimeseriesRequest, options?: RpcOptions): UnaryCall<TimeseriesRequest, RevenueTimeseries>;
    
    getEventPerformance(input: ReportRangeRequest, options?: RpcOptions): UnaryCall<ReportRangeRequest, EventPerformanceList>;
    
    getTicketTypeBreakdown(input: ReportRangeRequest, options?: RpcOptions): UnaryCall<ReportRangeRequest, TicketTypeBreakdownList>;
    
    getSalesByChannel(input: ReportRangeRequest, options?: RpcOptions): UnaryCall<ReportRangeRequest, SalesByChannelList>;
}

export class ReportingServiceClient implements IReportingServiceClient, ServiceInfo {
    typeName = ReportingService.typeName;
    methods = ReportingService.methods;
    options = ReportingService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    
    getReportingAccess(input: Empty, options?: RpcOptions): UnaryCall<Empty, ReportingAccess> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<Empty, ReportingAccess>("unary", this._transport, method, opt, input);
    }
    
    getReportSummary(input: ReportRangeRequest, options?: RpcOptions): UnaryCall<ReportRangeRequest, ReportSummary> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<ReportRangeRequest, ReportSummary>("unary", this._transport, method, opt, input);
    }
    
    getRevenueTimeseries(input: TimeseriesRequest, options?: RpcOptions): UnaryCall<TimeseriesRequest, RevenueTimeseries> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<TimeseriesRequest, RevenueTimeseries>("unary", this._transport, method, opt, input);
    }
    
    getEventPerformance(input: ReportRangeRequest, options?: RpcOptions): UnaryCall<ReportRangeRequest, EventPerformanceList> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<ReportRangeRequest, EventPerformanceList>("unary", this._transport, method, opt, input);
    }
    
    getTicketTypeBreakdown(input: ReportRangeRequest, options?: RpcOptions): UnaryCall<ReportRangeRequest, TicketTypeBreakdownList> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<ReportRangeRequest, TicketTypeBreakdownList>("unary", this._transport, method, opt, input);
    }
    
    getSalesByChannel(input: ReportRangeRequest, options?: RpcOptions): UnaryCall<ReportRangeRequest, SalesByChannelList> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<ReportRangeRequest, SalesByChannelList>("unary", this._transport, method, opt, input);
    }
}

export interface ITenantTierServiceClient {
    
    listTenantReportingAccess(input: PageRequest, options?: RpcOptions): UnaryCall<PageRequest, TenantReportingAccessList>;
    
    setTenantTier(input: SetTenantTierRequest, options?: RpcOptions): UnaryCall<SetTenantTierRequest, AckResponse>;
    
    setTenantAdvancedReporting(input: SetTenantAdvancedReportingRequest, options?: RpcOptions): UnaryCall<SetTenantAdvancedReportingRequest, AckResponse>;
    
    setTenantAch(input: SetTenantAchRequest, options?: RpcOptions): UnaryCall<SetTenantAchRequest, AckResponse>;
}

export class TenantTierServiceClient implements ITenantTierServiceClient, ServiceInfo {
    typeName = TenantTierService.typeName;
    methods = TenantTierService.methods;
    options = TenantTierService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    
    listTenantReportingAccess(input: PageRequest, options?: RpcOptions): UnaryCall<PageRequest, TenantReportingAccessList> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<PageRequest, TenantReportingAccessList>("unary", this._transport, method, opt, input);
    }
    
    setTenantTier(input: SetTenantTierRequest, options?: RpcOptions): UnaryCall<SetTenantTierRequest, AckResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<SetTenantTierRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    setTenantAdvancedReporting(input: SetTenantAdvancedReportingRequest, options?: RpcOptions): UnaryCall<SetTenantAdvancedReportingRequest, AckResponse> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<SetTenantAdvancedReportingRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    setTenantAch(input: SetTenantAchRequest, options?: RpcOptions): UnaryCall<SetTenantAchRequest, AckResponse> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<SetTenantAchRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
}
