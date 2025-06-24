"use client";
import { Stripe } from "stripe"
import { ProductCard } from "./product-card";
import { useState } from "react";

interface Props{
    products: Stripe.Product[];
}

export const ProductList = ({products}: Props) => {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredProducts = products.filter((product) => {
        const term = searchTerm.toLowerCase();
        return product.name.toLowerCase().includes(term)
    })
    //console.log(products)
    return (
        <div>
            <div>
                <input type="text" placeholder="Search Products.." onChange={(e) => {setSearchTerm(e.target.value)}} value={searchTerm} />
            </div>

            <ul>
                {filteredProducts.map((product, key) => {
                    return <li key={key}><ProductCard product={product}/></li>
                })}
            </ul>
        </div>
    )
}