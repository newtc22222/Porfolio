export interface Badge {
  id: string;
  title: string;
  issuer: string; // e.g. "Anthropic Academy", "Coursera", "AWS"
  instructor?: string;
  issuedOn: string; // YYYY-MM-DD, YYYY-MM or YYYY
  image?: string; // badge artwork, e.g. /assets/badges/<id>.png
  credentialUrl?: string; // public page where the badge can be verified
  description?: string;
  skills?: string[];
}
