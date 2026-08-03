import { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../store/useStore';

const PRODUCTS = [
  {
    id: 'p1',
    name: "Babolat Pure Aero",
    category: "Raquetes",
    price: 1890,
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 'p2',
    name: "Tênis ASICS Gel-Resolution 9 Clay",
    category: "Calçados",
    price: 999,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 'p3',
    name: "Camisa Biotenis Performance",
    category: "Vestuário",
    price: 189,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 'p4',
    name: "Tubo Babolat Gold Academy",
    category: "Acessórios",
    price: 79,
    image: "https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=800&auto=format&fit=crop"
  }
];

export default function ProShopPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useStore(state => state.cart);
  const addToCart = useStore(state => state.addToCart);
  const removeFromCart = useStore(state => state.removeFromCart);
  const clearCart = useStore(state => state.clearCart);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    let text = `Olá, Biotenis! Gostaria de finalizar a compra dos seguintes itens na Pro Shop:\n\n`;
    cart.forEach(item => {
      text += `- ${item.quantity}x ${item.name} (${formatPrice(item.price)})\n`;
    });
    text += `\n*Total: ${formatPrice(cartTotal)}*\n\nAguardo as instruções de pagamento!`;
    
    const encodedText = encodeURIComponent(text);
    // Substitua pelo número real do WhatsApp
    const whatsappNumber = '5582933280000';
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedText}`, '_blank');
    
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-[#cc4f33] text-[10px] uppercase tracking-[0.25em] font-semibold mb-4 block">Biotenis Pro Shop</span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-slate-900">Equipamento à Altura.</h1>
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-white bg-[#cc4f33] px-6 py-3 rounded-full hover:bg-[#e06042] active:scale-95 transition-all shadow-[0_0_20px_rgba(204,79,51,0.3)] relative"
          >
            <ShoppingBag size={16} />
            Sacola ({cartItemCount})
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {PRODUCTS.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl hover:border-[#cc4f33]/30 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="bg-slate-100 aspect-square relative overflow-hidden flex items-center justify-center border-b border-slate-200">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent z-10 pointer-events-none"></div>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-all duration-700 relative z-0"
                />
                
                {/* Desktop hover overlay button */}
                <div className="hidden sm:block absolute inset-x-0 bottom-0 p-4 z-20 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <button 
                    onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1 })}
                    className="w-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-900 py-3.5 rounded-2xl text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-[#cc4f33] hover:border-[#cc4f33]/50 active:scale-95 transition-all cursor-pointer"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col justify-between items-start p-6 flex-1">
                <div className="w-full">
                  <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] mb-3 font-semibold">{product.category}</p>
                  <h3 className="text-slate-900 text-base font-heading font-bold leading-tight mb-4 group-hover:text-[#cc4f33] transition-colors">{product.name}</h3>
                </div>
                <div className="w-full flex items-center justify-between gap-4">
                  <span className="text-slate-900 font-mono text-sm font-bold">{formatPrice(product.price)}</span>
                  {/* Mobile persistent add button */}
                  <button 
                    onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1 })}
                    className="sm:hidden flex items-center gap-2 bg-[#cc4f33]/10 border border-[#cc4f33]/30 text-[#cc4f33] px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest font-bold hover:bg-[#cc4f33]/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <Plus size={14} />
                    Adicionar
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Shopping Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white border-l border-slate-200 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h2 className="font-heading font-bold text-2xl text-slate-900">Sua Sacola</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-slate-500 hover:text-slate-900 transition-colors p-2 rounded-full hover:bg-slate-200 active:scale-95">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
                    <ShoppingBag size={48} className="mb-4" />
                    <p className="font-light text-sm uppercase tracking-widest">Sua sacola está vazia</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence>
                      {cart.map(item => (
                        <motion.div 
                          key={item.id} 
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                          className="flex justify-between items-center bg-slate-50 border border-slate-200 p-4 rounded-2xl"
                        >
                          <div>
                            <h4 className="text-slate-900 text-sm font-heading font-bold mb-1">{item.name}</h4>
                            <p className="text-[#cc4f33] font-mono text-xs">{formatPrice(item.price)} <span className="text-slate-500 ml-2 font-sans">Qtd: {item.quantity}</span></p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-500 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 active:scale-95"
                          >
                            <X size={16} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-slate-200 bg-slate-50">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-slate-600 text-[10px] uppercase tracking-[0.2em] font-bold">Total</span>
                    <span className="text-slate-900 font-heading font-bold text-3xl">{formatPrice(cartTotal)}</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#cc4f33] to-[#e06042] text-white py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] font-bold hover:shadow-[0_0_20px_rgba(204,79,51,0.3)] active:scale-95 transition-all"
                  >
                    <CreditCard size={18} />
                    Finalizar Compra
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
