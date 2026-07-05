



import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { TenantService } from "./tenant";
import type { SetTenantAchEnabledRequest } from "./tenant";
import type { UpdateTenantStripeProfileRequest } from "./tenant";
import type { TenantStripeProfile } from "./tenant";
import type { TenantStripeStatus } from "./tenant";
import type { ListTenantMembersResponse } from "./tenant";
import type { ListPublicTenantsResponse } from "./tenant";
import type { ListTenantsResponse } from "./tenant";
import type { PageRequest } from "./common";
import type { PublicTenantBranding } from "./tenant";
import type { PublicTenantBrandingRequest } from "./tenant";
import type { UpdateMyTenantBrandingRequest } from "./tenant";
import type { UpdateMyTenantContactRequest } from "./tenant";
import type { Empty } from "./common";
import type { Tenant } from "./tenant";
import type { UuidValue } from "./common";
import type { AckResponse } from "./common";
import type { UpdateTenantRequest } from "./tenant";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { CreateTenantResponse } from "./tenant";
import type { CreateTenantRequest } from "./tenant";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";

export interface ITenantServiceClient {
    
    createTenant(input: CreateTenantRequest, options?: RpcOptions): UnaryCall<CreateTenantRequest, CreateTenantResponse>;
    
    updateTenant(input: UpdateTenantRequest, options?: RpcOptions): UnaryCall<UpdateTenantRequest, AckResponse>;
    
    archiveTenant(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse>;
    
    getTenant(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, Tenant>;
    
    getMyTenant(input: Empty, options?: RpcOptions): UnaryCall<Empty, Tenant>;
    
    updateMyTenantContact(input: UpdateMyTenantContactRequest, options?: RpcOptions): UnaryCall<UpdateMyTenantContactRequest, AckResponse>;
    
    updateMyTenantBranding(input: UpdateMyTenantBrandingRequest, options?: RpcOptions): UnaryCall<UpdateMyTenantBrandingRequest, AckResponse>;
    
    getPublicTenantBranding(input: PublicTenantBrandingRequest, options?: RpcOptions): UnaryCall<PublicTenantBrandingRequest, PublicTenantBranding>;
    
    listTenants(input: PageRequest, options?: RpcOptions): UnaryCall<PageRequest, ListTenantsResponse>;
    
    listPublicTenants(input: Empty, options?: RpcOptions): UnaryCall<Empty, ListPublicTenantsResponse>;
    
    listTenantMembers(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, ListTenantMembersResponse>;
    
    getTenantStripeStatus(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, TenantStripeStatus>;
    
    getTenantStripeProfile(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, TenantStripeProfile>;
    
    updateTenantStripeProfile(input: UpdateTenantStripeProfileRequest, options?: RpcOptions): UnaryCall<UpdateTenantStripeProfileRequest, AckResponse>;
    
    setTenantAchEnabled(input: SetTenantAchEnabledRequest, options?: RpcOptions): UnaryCall<SetTenantAchEnabledRequest, AckResponse>;
}

export class TenantServiceClient implements ITenantServiceClient, ServiceInfo {
    typeName = TenantService.typeName;
    methods = TenantService.methods;
    options = TenantService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    
    createTenant(input: CreateTenantRequest, options?: RpcOptions): UnaryCall<CreateTenantRequest, CreateTenantResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreateTenantRequest, CreateTenantResponse>("unary", this._transport, method, opt, input);
    }
    
    updateTenant(input: UpdateTenantRequest, options?: RpcOptions): UnaryCall<UpdateTenantRequest, AckResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<UpdateTenantRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    archiveTenant(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, AckResponse> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    getTenant(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, Tenant> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, Tenant>("unary", this._transport, method, opt, input);
    }
    
    getMyTenant(input: Empty, options?: RpcOptions): UnaryCall<Empty, Tenant> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<Empty, Tenant>("unary", this._transport, method, opt, input);
    }
    
    updateMyTenantContact(input: UpdateMyTenantContactRequest, options?: RpcOptions): UnaryCall<UpdateMyTenantContactRequest, AckResponse> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<UpdateMyTenantContactRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    updateMyTenantBranding(input: UpdateMyTenantBrandingRequest, options?: RpcOptions): UnaryCall<UpdateMyTenantBrandingRequest, AckResponse> {
        const method = this.methods[6], opt = this._transport.mergeOptions(options);
        return stackIntercept<UpdateMyTenantBrandingRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    getPublicTenantBranding(input: PublicTenantBrandingRequest, options?: RpcOptions): UnaryCall<PublicTenantBrandingRequest, PublicTenantBranding> {
        const method = this.methods[7], opt = this._transport.mergeOptions(options);
        return stackIntercept<PublicTenantBrandingRequest, PublicTenantBranding>("unary", this._transport, method, opt, input);
    }
    
    listTenants(input: PageRequest, options?: RpcOptions): UnaryCall<PageRequest, ListTenantsResponse> {
        const method = this.methods[8], opt = this._transport.mergeOptions(options);
        return stackIntercept<PageRequest, ListTenantsResponse>("unary", this._transport, method, opt, input);
    }
    
    listPublicTenants(input: Empty, options?: RpcOptions): UnaryCall<Empty, ListPublicTenantsResponse> {
        const method = this.methods[9], opt = this._transport.mergeOptions(options);
        return stackIntercept<Empty, ListPublicTenantsResponse>("unary", this._transport, method, opt, input);
    }
    
    listTenantMembers(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, ListTenantMembersResponse> {
        const method = this.methods[10], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, ListTenantMembersResponse>("unary", this._transport, method, opt, input);
    }
    
    getTenantStripeStatus(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, TenantStripeStatus> {
        const method = this.methods[11], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, TenantStripeStatus>("unary", this._transport, method, opt, input);
    }
    
    getTenantStripeProfile(input: UuidValue, options?: RpcOptions): UnaryCall<UuidValue, TenantStripeProfile> {
        const method = this.methods[12], opt = this._transport.mergeOptions(options);
        return stackIntercept<UuidValue, TenantStripeProfile>("unary", this._transport, method, opt, input);
    }
    
    updateTenantStripeProfile(input: UpdateTenantStripeProfileRequest, options?: RpcOptions): UnaryCall<UpdateTenantStripeProfileRequest, AckResponse> {
        const method = this.methods[13], opt = this._transport.mergeOptions(options);
        return stackIntercept<UpdateTenantStripeProfileRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
    
    setTenantAchEnabled(input: SetTenantAchEnabledRequest, options?: RpcOptions): UnaryCall<SetTenantAchEnabledRequest, AckResponse> {
        const method = this.methods[14], opt = this._transport.mergeOptions(options);
        return stackIntercept<SetTenantAchEnabledRequest, AckResponse>("unary", this._transport, method, opt, input);
    }
}
