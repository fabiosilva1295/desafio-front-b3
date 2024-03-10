export interface Menu {
    category: string;
    items: MenuItem[]
}

export interface MenuItem {
    label: string;
    value: string | number;
    icon?: string;
    router: string
}