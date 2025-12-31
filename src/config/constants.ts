export const WHATSAPP_NUMBER = "94767764438";

export const getWhatsAppLink = (message: string) => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
