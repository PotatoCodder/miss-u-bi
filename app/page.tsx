'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import logo from "@/assets/images/logo.jpg";

// Smooth scroll function
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

// Static product data
const staticProducts = [
  {
    id: 1,
    name: "Misubi Regular",
    description: "The original favorite — simple, tasty, and perfectly satisfying.",
    price: 45,
    quantity: 50,
    image_path: "/assets/images/product-1760518250931-100113996.jpg"
  },
  {
    id: 2,
    name: "Misubi with Egg",
    description: "A twist on the classic — topped with a fluffy egg for an extra layer of flavor and heartiness.",
    price: 55,
    quantity: 30,
    image_path: "/assets/images/product-1760519137859-502885312.jpg"
  }
];

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image_path?: string;
}

export default function Home() {
  const [products] = useState<Product[]>(staticProducts);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-4 sm:px-6 py-4 bg-gradient-to-r from-pink-50 to-yellow-50 border-b border-pink-200 shadow-lg">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-pink-400 to-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <Image
              src={logo}
              alt="Miss U Bi Logo"
              width={20}
              height={20}
              className="rounded-full"
            />
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-pink-700">Miss U Bi 🍜</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <button onClick={() => scrollToSection('about')} className="text-pink-700 hover:text-yellow-500 font-medium transition-all duration-300 text-sm hover:scale-110">About ✨</button>
          <button onClick={() => scrollToSection('products')} className="text-pink-700 hover:text-yellow-500 font-medium transition-all duration-300 text-sm hover:scale-110">Products 🍱</button>
          <button onClick={() => scrollToSection('contact')} className="text-pink-700 hover:text-yellow-500 font-medium transition-all duration-300 text-sm hover:scale-110">Contact 📞</button>
        </nav>
        {/* Mobile menu button */}
        <button className="md:hidden text-pink-700 hover:text-yellow-500 transition-colors duration-300" onClick={() => {
          const nav = document.querySelector('nav');
          nav?.classList.toggle('hidden');
        }}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Hero Section */}
      <motion.section
        id="about"
        className="text-center py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-br from-pink-50 via-yellow-50 to-orange-50 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Cute floating elements */}
        <div className="absolute top-10 left-10 animate-bounce delay-100">🍜</div>
        <div className="absolute top-20 right-20 animate-bounce delay-300">🍱</div>
        <div className="absolute bottom-20 left-20 animate-bounce delay-500">🥢</div>
        <div className="absolute bottom-10 right-10 animate-bounce delay-700">🍚</div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 text-pink-700 tracking-tight drop-shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Spam Musubi 🌟
          </motion.h2>
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl text-yellow-600 mb-6 sm:mb-10 font-semibold animate-pulse"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The snack you love to TRY! 💖
          </motion.p>
          <motion.p
            className="text-base sm:text-lg max-w-3xl mx-auto mb-8 sm:mb-12 text-pink-600 leading-relaxed px-4 bg-white/50 rounded-2xl p-4 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Spam musubi originated in Hawaii 🌺. It is considered as a snack, light meal, and even as lunch.
            It is a popular grab-to-go food due to its portability. Why not try a taste of our very own
            Miss U Bi that is a blend of American and Japanese influences! 🇺🇸🇯🇵
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white hover:from-pink-600 hover:to-yellow-600 px-8 sm:px-12 py-3 sm:py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 text-sm sm:text-base font-bold animate-pulse">
              Order Now 🛒
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Products Section */}
      <motion.section
        id="products"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-pink-50 to-yellow-50 relative"
      >
        {/* Cute background elements */}
        <div className="absolute top-5 left-5 text-4xl animate-bounce delay-100">🌸</div>
        <div className="absolute top-10 right-10 text-3xl animate-bounce delay-300">🍙</div>
        <div className="absolute bottom-10 left-10 text-4xl animate-bounce delay-500">🥟</div>

        <motion.h3
          className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-pink-700 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our Products ✨
        </motion.h3>
        <div className="max-w-6xl mx-auto relative z-10">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="bg-white/80 backdrop-blur-sm border-2 border-pink-200 shadow-xl">
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="w-full h-40 sm:h-48 md:h-56 bg-pink-100 animate-pulse mb-4 sm:mb-6 rounded-2xl"></div>
                    <div className="h-6 sm:h-8 bg-pink-100 animate-pulse mb-3 rounded"></div>
                    <div className="h-4 bg-pink-100 animate-pulse mb-2 rounded"></div>
                    <div className="h-4 bg-pink-100 animate-pulse mb-4 sm:mb-6 rounded w-3/4"></div>
                    <div className="h-6 sm:h-8 bg-pink-100 animate-pulse rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/90 backdrop-blur-sm border-2 border-pink-200 hover:border-yellow-400 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1">
                    <CardContent className="p-4 sm:p-6 md:p-8">
                      <div className="relative overflow-hidden rounded-2xl mb-4 sm:mb-6 shadow-lg">
                        <Image
                          src={product.image_path || "/assets/images/logo.jpg"}
                          alt={product.name}
                          width={300}
                          height={200}
                          className="w-full h-40 sm:h-48 md:h-56 object-cover hover:scale-110 transition-transform duration-500"
                          unoptimized
                        />
                        <div className="absolute top-2 right-2 bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold animate-bounce">
                          {index === 0 ? "🌟" : "💖"}
                        </div>
                      </div>
                      <CardTitle className="text-xl sm:text-2xl font-bold mb-3 text-pink-700">{product.name}</CardTitle>
                      <p className="text-pink-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base bg-yellow-50 p-3 rounded-xl">{product.description}</p>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                        <p className="text-2xl sm:text-3xl font-bold text-red-500 bg-yellow-100 px-3 py-1 rounded-full animate-pulse">₱{product.price}</p>
                        <span className="text-sm text-pink-600 bg-pink-100 px-3 py-1 rounded-full self-start sm:self-auto shadow-md">
                          {product.quantity} in stock 📦
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-pink-200 shadow-xl">
              <CardContent className="p-8 sm:p-12 text-center">
                <div className="w-20 sm:w-24 h-20 sm:h-24 bg-pink-100 rounded-full mx-auto mb-6 flex items-center justify-center animate-bounce">
                  <span className="text-3xl">😢</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-pink-700 mb-4">No Products Available</h3>
                <p className="text-pink-600 mb-6 bg-yellow-50 p-4 rounded-xl text-sm sm:text-base">
                  Products will be displayed here once added by the administrator.
                </p>
                <p className="text-sm text-pink-500 bg-pink-50 p-2 rounded-lg">
                  Visit the admin dashboard to add products.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-pink-50 to-yellow-50 relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Cute floating elements */}
        <div className="absolute top-10 left-10 animate-bounce delay-100">📱</div>
        <div className="absolute top-20 right-20 animate-bounce delay-300">💬</div>
        <div className="absolute bottom-20 left-20 animate-bounce delay-500">🌟</div>

        <div className="max-w-4xl mx-auto relative z-10">
          <h3 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-pink-700">Contact Us 💕</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/90 backdrop-blur-sm border-2 border-pink-200 hover:border-green-400 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl sm:text-2xl text-pink-700 flex items-center">
                    <span className="text-2xl mr-3 animate-bounce">📞</span>
                    Phone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base sm:text-lg text-pink-600 font-bold bg-green-50 p-3 rounded-xl">09553240266</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/90 backdrop-blur-sm border-2 border-pink-200 hover:border-blue-400 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl sm:text-2xl text-pink-700 flex items-center">
                    <span className="text-2xl mr-3 animate-bounce">📘</span>
                    Facebook
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href="https://www.facebook.com/profile.php?id=61580429570710"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-base sm:text-lg hover:text-blue-800 font-bold transition-colors duration-300 bg-blue-50 p-3 rounded-xl block hover:bg-blue-100"
                  >
                    Miss U Bi 🌸
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <p className="text-pink-600 text-base sm:text-lg px-4 bg-yellow-50 p-4 rounded-2xl shadow-lg animate-pulse">
              Follow us on Facebook for updates and special offers! 🎉✨
            </p>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="bg-gradient-to-r from-pink-600 to-yellow-600 text-white py-12 sm:py-16 px-4 sm:px-6 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {/* Cute footer elements */}
        <div className="absolute top-5 left-5 animate-bounce delay-100">🍜</div>
        <div className="absolute top-10 right-10 animate-bounce delay-300">💖</div>
        <div className="absolute bottom-5 left-10 animate-bounce delay-500">🌸</div>
        <div className="absolute bottom-10 right-5 animate-bounce delay-700">⭐</div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Image
                src={logo}
                alt="Miss U Bi Logo"
                width={20}
                height={20}
                className="rounded-full"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-yellow-200 drop-shadow-lg">Miss U Bi ✨</h3>
          </div>
          <p className="text-pink-100 mb-4 text-sm sm:text-base font-semibold">&copy; 2025 Miss U Bi. All rights reserved. 🌺</p>
          <p className="text-xs sm:text-sm text-yellow-200 animate-pulse">Made with ❤️ for spam musubi lovers 💕</p>
        </div>
      </motion.footer>
    </div>
  );
}
