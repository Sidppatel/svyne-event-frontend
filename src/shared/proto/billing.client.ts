



import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { DeveloperBillingService } from "./billing";
import type { TenantActivityList } from "./billing";
import type { TenantActivityRequest } from "./billing";
import type { RevenueReport } from "./billing";
import type { RevenueReportRequest } from "./billing";
import type { ClearEventFeeOverrideRequest } from "./billing";
import type { SetEventFeeOverrideRequest } from "./billing";
import type { FeeOverrideList } from "./billing";
import type { Empty } from "./common";
import type { CancelAddonRequest } from "./billing";
import type { ProvisionAddonRequest } from "./billing";
import type { TenantAddonList } from "./billing";
import type { CancelEventUpgradeRequest } from "./billing";
import type { EventUpgradeRequest } from "./billing";
import type { EventUpgradeList } from "./billing";
import type { CancelSubscriptionRequest } from "./billing";
import type { SubscriptionRequest } from "./billing";
import type { AckResponse } from "./common";
import type { TenantRequest } from "./billing";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { TenantBillingList } from "./billing";
import type { PageRequest } from "./common";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";

export interface IDeveloperBillingServiceClient {
    
    listTenantBilling(input: PageRequest, options?: RpcOptions): UnaryCall<PageRequest, TenantBillingList>;
    
    startTrial(input: TenantRequest, options?: RpcOptions): UnaryCall<TenantRequest, AckResponse>;
    
    createSubscription(input: SubscriptionRequest, options?: RpcOptions): UnaryCall<SubscriptionRequest, AckResponse>;
    
    changeSubscriptionTier(input: SubscriptionRequest, options?: RpcOptions): UnaryCall<SubscriptionRequest, AckResponse>;
    
    cancelSubscription(input: CancelSubscriptionRequest, options?: RpcOptions): UnaryCall<CancelSubscriptionRequest, AckResponse>;
    
    listEventUpgrades(input: PageRequest, options?: RpcOptions): UnaryCall<PageRequest, EventUpgradeList>;
    
    activateEventUpgrade(input: EventUpgradeRequest, options?: RpcOptions): UnaryCall<EventUpgradeRequest, AckResponse>;
    
    cancelEventUpgrade(input: CancelEventUpgradeRequest, options?: RpcOptions): UnaryCall<CancelEventUpgradeRequest, AckResponse>;
    
    listTenantAddons(input: TenantRequest, options?: RpcOptions): UnaryCall<TenantRequest, TenantAddonList>;
    
    provisionAddon(input: ProvisionAddonRequest, options?: RpcOptions): UnaryCall<ProvisionAddonRequest, AckResponse>;
    
    cancelAddon(input: CancelAddonRequest, options?: RpcOptions): UnaryCall<CancelAddonRequest, AckResponse>;
    
    listFeeOverrides(input: Empty, options?: RpcOptions): UnaryCall<Empty, FeeOverrideList>;
    
    setEventFeeOverride(input: SetEventFeeOverrideRequest, options?: RpcOptions): UnaryCall<SetEventFeeOverrideRequest, AckResponse>;
    
    clearEventFeeOverride(input: ClearEventFeeOverrideRequest, options?: RpcOptions): UnaryCall<ClearEventFeeOverrideRequest, AckResponse>;
    
    getRevenueReport(input: RevenueReportRequest, options?: RpcOptions): UnaryCall<RevenueReportRequest, RevenueReport>;
    
    getTenantActivity(input: TenantActivityRequest, options?: RpcOptions): UnaryCall<TenantActivityRequest, TenantActivityList>;
}

export class DeveloperBillingServiceClient implements IDeveloperBillingServiceClient, ServiceInfo {
    typeName = DeveloperBillingService.typeName;
    methods = DeveloperBillingService.methods;
    options = DeveloperBillingService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    
    listTenantBilling(input: PageRequest, options?: RpcOptions): UnaryCall<PageRequest, TenantBillingList> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<PageRequest, TenantBillingList>("unary", this._transport, method, opt, input);
    }
    
    startTrial(input: TenantRequest, options?: RpcOptions): UnaryCall<TenantRequest, AckResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<TenantRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    createSubscription(input: SubscriptionRequest, options?: RpcOptions): UnaryCall<SubscriptionRequest, AckResponse> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<SubscriptionRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    changeSubscriptionTier(input: SubscriptionRequest, options?: RpcOptions): UnaryCall<SubscriptionRequest, AckResponse> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<SubscriptionRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    cancelSubscription(input: CancelSubscriptionRequest, options?: RpcOptions): UnaryCall<CancelSubscriptionRequest, AckResponse> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<CancelSubscriptionRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    listEventUpgrades(input: PageRequest, options?: RpcOptions): UnaryCall<PageRequest, EventUpgradeList> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<PageRequest, EventUpgradeList>("unary", this._transport, method, opt, input);
    }
    
    activateEventUpgrade(input: EventUpgradeRequest, options?: RpcOptions): UnaryCall<EventUpgradeRequest, AckResponse> {
        const method = this.methods[6], opt = this._transport.mergeOptions(options);
        return stackIntercept<EventUpgradeRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    cancelEventUpgrade(input: CancelEventUpgradeRequest, options?: RpcOptions): UnaryCall<CancelEventUpgradeRequest, AckResponse> {
        const method = this.methods[7], opt = this._transport.mergeOptions(options);
        return stackIntercept<CancelEventUpgradeRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    listTenantAddons(input: TenantRequest, options?: RpcOptions): UnaryCall<TenantRequest, TenantAddonList> {
        const method = this.methods[8], opt = this._transport.mergeOptions(options);
        return stackIntercept<TenantRequest, TenantAddonList>("unary", this._transport, method, opt, input);
    }
    
    provisionAddon(input: ProvisionAddonRequest, options?: RpcOptions): UnaryCall<ProvisionAddonRequest, AckResponse> {
        const method = this.methods[9], opt = this._transport.mergeOptions(options);
        return stackIntercept<ProvisionAddonRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    cancelAddon(input: CancelAddonRequest, options?: RpcOptions): UnaryCall<CancelAddonRequest, AckResponse> {
        const method = this.methods[10], opt = this._transport.mergeOptions(options);
        return stackIntercept<CancelAddonRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    listFeeOverrides(input: Empty, options?: RpcOptions): UnaryCall<Empty, FeeOverrideList> {
        const method = this.methods[11], opt = this._transport.mergeOptions(options);
        return stackIntercept<Empty, FeeOverrideList>("unary", this._transport, method, opt, input);
    }
    
    setEventFeeOverride(input: SetEventFeeOverrideRequest, options?: RpcOptions): UnaryCall<SetEventFeeOverrideRequest, AckResponse> {
        const method = this.methods[12], opt = this._transport.mergeOptions(options);
        return stackIntercept<SetEventFeeOverrideRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    clearEventFeeOverride(input: ClearEventFeeOverrideRequest, options?: RpcOptions): UnaryCall<ClearEventFeeOverrideRequest, AckResponse> {
        const method = this.methods[13], opt = this._transport.mergeOptions(options);
        return stackIntercept<ClearEventFeeOverrideRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    getRevenueReport(input: RevenueReportRequest, options?: RpcOptions): UnaryCall<RevenueReportRequest, RevenueReport> {
        const method = this.methods[14], opt = this._transport.mergeOptions(options);
        return stackIntercept<RevenueReportRequest, RevenueReport>("unary", this._transport, method, opt, input);
    }
    
    getTenantActivity(input: TenantActivityRequest, options?: RpcOptions): UnaryCall<TenantActivityRequest, TenantActivityList> {
        const method = this.methods[15], opt = this._transport.mergeOptions(options);
        return stackIntercept<TenantActivityRequest, TenantActivityList>("unary", this._transport, method, opt, input);
    }
}
