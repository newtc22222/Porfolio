export const FULLNAME = 'Phi Vo';
// Used for the monogram in the header and footer.
export const INITIALS = FULLNAME.split(/\s+/)
  .map((word) => word[0])
  .join('')
  .slice(0, 2)
  .toUpperCase();
export const JOB_TITLE = 'Software Engineer · AI';
export const EMAIL = 'phi.vo.tech@gmail.com';

export const SOCIAL_LINKS = {
  LINKEDIN: 'https://www.linkedin.com/in/phi-vo-tech/',
  GITHUB: 'https://github.com/newtc22222',
  GITLAB: 'https://gitlab.com/newtc22222',
  FACEBOOK: 'https://www.facebook.com/fee.fight',
} as const;

// The one sentence at the top of the home page, also used on the share card.
// DRAFT: Phi to review
export const HERO_LINE = 'Phi Vo builds small tools that teams use every day.';
