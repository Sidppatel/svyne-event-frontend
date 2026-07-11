import { venueClient, performerClient, sponsorClient } from '@/shared/apiClient';
import { callRpc } from '@/shared/session';
import type { Venue, Performer, Sponsor, VenueImage } from '@/shared/proto/catalog';

const page = { offset: 0, limit: 100, search: '' };

export async function listVenues(): Promise<Venue[]> {
  const response = await callRpc(() => venueClient.listVenues(page));
  return response.venues;
}

export async function getVenue(venuesId: string): Promise<Venue> {
  return callRpc(() => venueClient.getVenue({ value: venuesId }));
}

export interface VenueDraft {
  name: string;
  description: string;
  phone: string;
  email: string;
  website: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
}

export async function createVenue(draft: VenueDraft): Promise<string> {
  const response = await callRpc(() =>
    venueClient.createVenue({
      name: draft.name,
      description: draft.description,
      imagePath: '',
      phone: draft.phone,
      email: draft.email,
      website: draft.website,
      line1: draft.line1,
      line2: draft.line2,
      city: draft.city,
      state: draft.state,
      zip: draft.zip,
    }),
  );
  return response.value;
}

export async function updateVenue(venuesId: string, draft: VenueDraft, isActive: boolean): Promise<void> {
  await callRpc(() =>
    venueClient.updateVenue({
      venuesId,
      name: draft.name,
      description: draft.description,
      phone: draft.phone,
      email: draft.email,
      website: draft.website,
      line1: draft.line1,
      line2: draft.line2,
      city: draft.city,
      state: draft.state,
      zip: draft.zip,
      isActive,
    }),
  );
}

export async function listVenueImages(venuesId: string): Promise<VenueImage[]> {
  const response = await callRpc(() => venueClient.listVenueImages({ value: venuesId }));
  return response.images;
}

export async function addVenueImage(venuesId: string, imagesId: string): Promise<void> {
  await callRpc(() => venueClient.addVenueImage({ venuesId, imagesId }));
}

export async function removeVenueImage(venuesId: string, imagesId: string): Promise<void> {
  await callRpc(() => venueClient.removeVenueImage({ venuesId, imagesId }));
}

export async function setPrimaryVenueImage(venuesId: string, imagesId: string): Promise<void> {
  await callRpc(() => venueClient.setPrimaryVenueImage({ venuesId, imagesId }));
}

export interface NamedDraft {
  name: string;
  slug: string;
  imagePath: string;
  metaJson: string;
  isActive: boolean;
}

export async function listPerformers(): Promise<Performer[]> {
  const response = await callRpc(() => performerClient.listPerformers(page));
  return response.performers;
}

export async function createPerformer(draft: NamedDraft): Promise<string> {
  const response = await callRpc(() =>
    performerClient.createPerformer({
      name: draft.name,
      slug: draft.slug,
      imagePath: draft.imagePath,
      metaJson: draft.metaJson,
      isActive: draft.isActive,
    }),
  );
  return response.value;
}

export async function updatePerformer(performersId: string, draft: NamedDraft): Promise<void> {
  await callRpc(() =>
    performerClient.updatePerformer({
      performersId,
      name: draft.name,
      imagePath: draft.imagePath,
      metaJson: draft.metaJson,
      isActive: draft.isActive,
    }),
  );
}

export async function deletePerformer(performersId: string): Promise<void> {
  await callRpc(() => performerClient.deletePerformer({ value: performersId }));
}

export async function listSponsors(): Promise<Sponsor[]> {
  const response = await callRpc(() => sponsorClient.listSponsors(page));
  return response.sponsors;
}

export async function createSponsor(draft: NamedDraft): Promise<string> {
  const response = await callRpc(() =>
    sponsorClient.createSponsor({
      name: draft.name,
      slug: draft.slug,
      imagePath: draft.imagePath,
      metaJson: draft.metaJson,
      isActive: draft.isActive,
    }),
  );
  return response.value;
}

export async function updateSponsor(sponsorsId: string, draft: NamedDraft): Promise<void> {
  await callRpc(() =>
    sponsorClient.updateSponsor({
      sponsorsId,
      name: draft.name,
      imagePath: draft.imagePath,
      metaJson: draft.metaJson,
      isActive: draft.isActive,
    }),
  );
}

export async function deleteSponsor(sponsorsId: string): Promise<void> {
  await callRpc(() => sponsorClient.deleteSponsor({ value: sponsorsId }));
}

export async function setEventPerformers(eventsId: string, performerIds: string[]): Promise<void> {
  const linksJson = JSON.stringify(performerIds.map((performerId, sortOrder) => ({ performerId, sortOrder })));
  await callRpc(() => performerClient.setEventPerformers({ eventsId, linksJson }));
}

export async function setEventSponsors(eventsId: string, sponsorIds: string[]): Promise<void> {
  const linksJson = JSON.stringify(sponsorIds.map((sponsorId, sortOrder) => ({ sponsorId, sortOrder })));
  await callRpc(() => sponsorClient.setEventSponsors({ eventsId, linksJson }));
}

export function formatTaxRate(value: number): string {
  return (value * 100).toFixed(3);
}
