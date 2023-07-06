export interface ProductDetailsBasic {
    id: number;
    medicineName: string;
    imagePath: string;
}

export interface ProductDiscountPayload {
    ProductId: number;
    DiscountPercent: number;
}

