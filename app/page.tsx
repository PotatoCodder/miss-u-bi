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
      <header className="flex justify-between items-center px-4 sm:px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-md">
            <Image
              src={logo}
              alt="Miss U Bi Logo"
              width={20}
              height={20}
              className="rounded-full"
            />
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-black">Miss U Bi</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <button onClick={() => scrollToSection('about')} className="text-black hover:text-yellow-500 font-medium transition-colors duration-200 text-sm">About</button>
          <button onClick={() => scrollToSection('products')} className="text-black hover:text-yellow-500 font-medium transition-colors duration-200 text-sm">Products</button>
          <button onClick={() => scrollToSection('contact')} className="text-black hover:text-yellow-500 font-medium transition-colors duration-200 text-sm">Contact</button>
        </nav>
        {/* Mobile menu button */}
        <button className="md:hidden text-black" onClick={() => {
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
        className="text-center py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-br from-white to-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 text-black tracking-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Spam Musubi
          </motion.h2>
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl text-yellow-500 mb-6 sm:mb-10 font-semibold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The snack you love to TRY!
          </motion.p>
          <motion.p
            className="text-base sm:text-lg max-w-3xl mx-auto mb-8 sm:mb-12 text-gray-600 leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Spam musubi originated in Hawaii. It is considered as a snack, light meal, and even as lunch.
            It is a popular grab-to-go food due to its portability. Why not try a taste of our very own
            Miss U Bi that is a blend of American and Japanese influences!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button className="bg-black text-white hover:bg-gray-900 px-8 sm:px-12 py-3 sm:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
              Order Now
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
        className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gray-50"
      >
        <motion.h3
          className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-black"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Our Products
        </motion.h3>
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="bg-white border border-gray-200">
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="w-full h-40 sm:h-48 md:h-56 bg-gray-200 animate-pulse mb-4 sm:mb-6 rounded-lg"></div>
                    <div className="h-6 sm:h-8 bg-gray-200 animate-pulse mb-3 rounded"></div>
                    <div className="h-4 bg-gray-200 animate-pulse mb-2 rounded"></div>
                    <div className="h-4 bg-gray-200 animate-pulse mb-4 sm:mb-6 rounded w-3/4"></div>
                    <div className="h-6 sm:h-8 bg-gray-200 animate-pulse rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              {products.map((product) => (
                <Card key={product.id} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="relative overflow-hidden rounded-lg mb-4 sm:mb-6">
                      <Image
                        src={product.image_path || "/assets/images/logo.jpg"}
                        alt={product.name}
                        width={300}
                        height={200}
                        className="w-full h-40 sm:h-48 md:h-56 object-cover hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl font-bold mb-3 text-black">{product.name}</CardTitle>
                    <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">{product.description}</p>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                      <p className="text-2xl sm:text-3xl font-bold text-red-500">₱{product.price}</p>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full self-start sm:self-auto">
                        {product.quantity} in stock
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-8 sm:p-12 text-center">
                <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-10 sm:w-12 h-10 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4">No Products Available</h3>
                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                  Products will be displayed here once added by the administrator.
                </p>
                <p className="text-sm text-gray-500">
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
        className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-black">Contact Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl sm:text-2xl text-black flex items-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Phone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base sm:text-lg text-gray-600 font-medium">09553240266</p>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl sm:text-2xl text-black flex items-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-3 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="https://www.facebook.com/profile.php?id=61580429570710"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-base sm:text-lg hover:text-blue-800 font-medium transition-colors duration-200 break-all"
                >
                  Miss U Bi
                </a>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <p className="text-gray-600 text-base sm:text-lg px-4">
              Follow us on Facebook for updates and special offers!
            </p>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="bg-black text-white py-12 sm:py-16 px-4 sm:px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center">
              <Image
                src={logo}
                alt="Miss U Bi Logo"
                width={20}
                height={20}
                className="rounded-full"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-bold">Miss U Bi</h3>
          </div>
          <p className="text-gray-300 mb-4 text-sm sm:text-base">&copy; 2025 Miss U Bi. All rights reserved.</p>
          <p className="text-xs sm:text-sm text-gray-400">Made with ❤️ for spam musubi lovers</p>
        </div>
      </motion.footer>
    </div>
  );
}
