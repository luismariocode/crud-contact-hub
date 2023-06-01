// Interface para Contacto
export interface ContactDetails {
    contact_id?: number;
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    company: string;
    status:number;
    created_at?: string;
}
