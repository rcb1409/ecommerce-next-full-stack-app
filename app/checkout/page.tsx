"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store"
import { checkoutAction } from "./checkout-action";

export default function CheckoutPage() {
    const {items, removeItem, addItem, clearCart} = useCartStore();
    const total_amount = items.reduce((acc, item) => acc + item.quantity * item.price, 0)
    if (items.length === 0){
        return <div><h1>your cart is empty</h1></div>
    }
    return <div>
        <Card>
            <CardHeader>
            <CardTitle>Oder Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <ul>
                    {items.map((item,key) => (
                        <li key={key}>
                            <div>
                                <span> {item.name}</span>
                                <span>{" "} ${((item.price * item.quantity) / 100).toFixed(2)}</span>
                                  <div className="flex items-center space-x-4">
          <Button onClick={() => removeItem(item.id)} variant="outline" >
            –
          </Button>
          <span className="text-lg font-semibold">{item.quantity}</span>
          <Button onClick={() => {addItem({...item, quantity: 1})}}>+</Button>
        </div>
                            </div>
                        </li>
                    ))}
                </ul>
            <div>
                Total: ${(total_amount/100).toFixed(2)} 
                </div>    
            </CardContent>
        </Card>
        <form action={checkoutAction}>
            <input type="hidden" name="items" value={JSON.stringify(items)}/>
            <Button type="submit">
                Procced to Payment
            </Button>

            <Button onClick={() => {clearCart()}}>
                Clear Cart
            </Button>
        </form>
    </div>
}