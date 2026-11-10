// Lets any part of the page open the contact bubble (layout/ContactBubble).
export const CONTACT_OPEN_EVENT = 'contact:open';

export const openContact = () =>
  window.dispatchEvent(new Event(CONTACT_OPEN_EVENT));
