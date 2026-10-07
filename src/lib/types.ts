export type CampaignState = "scheduled" | "live" | "closed";

export type EntryPayload = {
  fullName: string;
  email: string;
  receiptCode: string;
  termsAccepted: boolean;
  marketingOptIn: boolean;
};

export type FieldErrors = Partial<Record<keyof EntryPayload, string>>;
