import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database for Sundarban Naturals...");

  // 1. Seed Admin User
  const passwordHash = await bcrypt.hash("admin123456", 10);
  const admin = await prisma.adminUser.upsert({
    where: { email: "admin@sundarbannaturals.com" },
    update: {
      passwordHash,
      name: "প্রধান অ্যাডমিন (Sundarban Naturals)",
    },
    create: {
      email: "admin@sundarbannaturals.com",
      passwordHash,
      name: "প্রধান অ্যাডমিন (Sundarban Naturals)",
      role: "SUPER_ADMIN",
    },
  });
  console.log("✅ Admin user seeded:", admin.email);

  // 2. Seed Packages
  const pkg500g = await prisma.package.upsert({
    where: { slug: "500g" },
    update: {
      name: "ট্রায়াল প্যাক",
      weight: "৫০০ গ্রাম জার",
      regularPrice: 750,
      salePrice: 650,
      freeDelivery: false,
      freeGift: false,
      popular: false,
      bestValue: false,
      features: JSON.stringify([
        "১০০% খাঁটি সুন্দরবনের কাঁচা মধু",
        "প्रीमিয়াম ফুড-গ্রেড গ্লাস জার",
        "ক্যাশ অন ডেলিভারি সুবিধা",
        "ডেলিভারিম্যানের সামনে চেক করার সুবিধা",
      ]),
      sortOrder: 1,
      isActive: true,
    },
    create: {
      slug: "500g",
      name: "ট্রায়াল প্যাক",
      weight: "৫০০ গ্রাম জার",
      regularPrice: 750,
      salePrice: 650,
      freeDelivery: false,
      freeGift: false,
      popular: false,
      bestValue: false,
      features: JSON.stringify([
        "১০০% খাঁটি সুন্দরবনের কাঁচা মধু",
        "প्रीमিয়াম ফুড-গ্রেড গ্লাস জার",
        "ক্যাশ অন ডেলিভারি সুবিধা",
        "ডেলিভারিম্যানের সামনে চেক করার সুবিধা",
      ]),
      sortOrder: 1,
      isActive: true,
    },
  });

  const pkg1kg = await prisma.package.upsert({
    where: { slug: "1kg" },
    update: {
      name: "বেস্ট সেলার প্যাক",
      weight: "১ কেজি প্রিমিয়াম জার",
      regularPrice: 1450,
      salePrice: 1200,
      freeDelivery: false,
      freeGift: true,
      freeGiftText: "১টি কাঠের তৈরি মধু চামচ ফ্রি 🎁",
      badgeText: "সবচেয়ে জনপ্রিয় প্যাক",
      popular: true,
      bestValue: false,
      features: JSON.stringify([
        "১০০% খাঁটি সুন্দরবনের কাঁচা মধু",
        "১টি কাঠের তৈরি মধু চামচ (হানি ডিপার) ফ্রি 🎁",
        "প्रीमিয়াম ফুড-গ্রেড এয়ারটাইট জার",
        "ক্যাশ অন ডেলিভারি সুবিধা",
        "মানি ব্যাক গ্যারান্টি",
      ]),
      sortOrder: 2,
      isActive: true,
    },
    create: {
      slug: "1kg",
      name: "বেস্ট সেলার প্যাক",
      weight: "১ কেজি প্রিমিয়াম জার",
      regularPrice: 1450,
      salePrice: 1200,
      freeDelivery: false,
      freeGift: true,
      freeGiftText: "১টি কাঠের তৈরি মধু চামচ ফ্রি 🎁",
      badgeText: "সবচেয়ে জনপ্রিয় প্যাক",
      popular: true,
      bestValue: false,
      features: JSON.stringify([
        "১০০% খাঁটি সুন্দরবনের কাঁচা মধু",
        "১টি কাঠের তৈরি মধু চামচ (হানি ডিপার) ফ্রি 🎁",
        "প्रीमিয়াম ফুড-গ্রেড এয়ারটাইট জার",
        "ক্যাশ অন ডেলিভারি সুবিধা",
        "মানি ব্যাক গ্যারান্টি",
      ]),
      sortOrder: 2,
      isActive: true,
    },
  });

  const pkg2kg = await prisma.package.upsert({
    where: { slug: "2kg" },
    update: {
      name: "ফ্যামিলি মেগা কম্বো",
      weight: "২ কেজি প্যাক (১ কেজি × ২ জার)",
      regularPrice: 2900,
      salePrice: 2200,
      freeDelivery: true,
      freeGift: true,
      freeGiftText: "১টি কাঠের তৈরি মধু চামচ ফ্রি 🎁",
      badgeText: "সর্বোচ্চ সাশ্রয়ী (ফ্রি ডেলিভারি)",
      popular: false,
      bestValue: true,
      features: JSON.stringify([
        "সারা বাংলাদেশে সম্পূর্ণ ফ্রি হোম ডেলিভারি 🚚",
        "১টি কাঠের তৈরি মধু চামচ (হানি ডিপার) ফ্রি 🎁",
        "১ কেজি করে ২টি প্রিমিয়াম জার (ব্যবহার ও সংরক্ষণ সহজ)",
        "সর্বোচ্চ ৭০০ টাকা নিশ্চিত সাশ্রয়",
        "১০০% মানি ব্যাক গ্যারান্টি",
      ]),
      sortOrder: 3,
      isActive: true,
    },
    create: {
      slug: "2kg",
      name: "ফ্যামিলি মেগা কম্বো",
      weight: "২ কেজি প্যাক (১ কেজি × ২ জার)",
      regularPrice: 2900,
      salePrice: 2200,
      freeDelivery: true,
      freeGift: true,
      freeGiftText: "১টি কাঠের তৈরি মধু চামচ ফ্রি 🎁",
      badgeText: "সর্বোচ্চ সাশ্রয়ী (ফ্রি ডেলিভারি)",
      popular: false,
      bestValue: true,
      features: JSON.stringify([
        "সারা বাংলাদেশে সম্পূর্ণ ফ্রি হোম ডেলিভারি 🚚",
        "১টি কাঠের তৈরি মধু চামচ (হানি ডিপার) ফ্রি 🎁",
        "১ কেজি করে ২টি প্রিমিয়াম জার (ব্যবহার ও সংরক্ষণ সহজ)",
        "সর্বোচ্চ ৭০০ টাকা নিশ্চিত সাশ্রয়",
        "১০০% মানি ব্যাক গ্যারান্টি",
      ]),
      sortOrder: 3,
      isActive: true,
    },
  });
  console.log("✅ Packages seeded");

  // 3. Seed Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      helplineNumber: "০১৭১১-XXXXXX",
      supportEmail: "support@sundarbannaturals.com",
      stockCounter: "স্টকে বাকি মাত্র ১৭ টি জার",
      deliveryChargeInsideDhaka: 70,
      deliveryChargeOutsideDhaka: 130,
      announcementText: "সীমিত অফার: আজকের অর্ডারে কাঠের মধু চামচ ফ্রি + বিশেষ ছাড়!",
    },
    create: {
      id: "default",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      helplineNumber: "০১৭১১-XXXXXX",
      supportEmail: "support@sundarbannaturals.com",
      stockCounter: "স্টকে বাকি মাত্র ১৭ টি জার",
      deliveryChargeInsideDhaka: 70,
      deliveryChargeOutsideDhaka: 130,
      announcementText: "সীমিত অফার: আজকের অর্ডারে কাঠের মধু চামচ ফ্রি + বিশেষ ছাড়!",
    },
  });
  console.log("✅ Site settings seeded");

  // 4. Seed Marketing Settings
  await prisma.marketingSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      gtmContainerId: "",
      ga4MeasurementId: "",
      fbPixelId: "",
      metaCapiAccessToken: "",
      metaTestEventCode: "",
      tiktokPixelId: "",
      customHeadScripts: "",
      customBodyStartScripts: "",
      customBodyEndScripts: "",
    },
  });
  console.log("✅ Marketing settings initialized");

  // 5. Seed Reviews
  const reviewsCount = await prisma.review.count();
  if (reviewsCount === 0) {
    const initialReviews = [
      {
        name: "ডাঃ তানভীর আহমেদ",
        location: "উত্তরা, ঢাকা",
        role: "চিকিৎসক ও নিয়মিত গ্রাহক",
        rating: 5,
        reviewText:
          "চিকিৎসক হিসেবে আমি সবসময় রোগীদের কাঁচা র-মধু খাওয়ার পরামর্শ দিই। সুন্দরবন ন্যাচারালসের মধুর সুবাস এবং সামান্য ঝাঁঝালো টেস্ট প্রমাণ করে এটা একদম আনপ্রসেসড খাঁটি খলিসার মধু। আমার পুরো পরিবার নিয়মিত খাচ্ছে।",
        packagePurchased: "১ কেজি প্রিমিয়াম জার",
        isVerified: true,
        isActive: true,
        sortOrder: 1,
      },
      {
        name: "নাসরিন সুলতানা",
        location: "পাঁচলাইশ, চট্টগ্রাম",
        role: "গৃহিণী",
        rating: 5,
        reviewText:
          "বাচ্চাদের ঠান্ডার সমস্যার জন্য অর্ডার করেছিলাম। আলহামদুলিল্লাহ, ২ সপ্তাহের নিয়মিত ব্যবহারে কাশি একদম সেরে গেছে। ডেলিভারিম্যানের সামনে চেক করে নেওয়ার সুযোগ থাকায় কোনো দ্বিধা ছিল না। প্যাকেজিং অসাধারণ ছিল।",
        packagePurchased: "২ কেজি ফ্যামিলি কম্বো",
        isVerified: true,
        isActive: true,
        sortOrder: 2,
      },
      {
        name: "মোঃ রফিকুল ইসলাম",
        location: "জিন্দাবাজার, সিলেট",
        role: "ব্যবসায়ী",
        rating: 5,
        reviewText:
          "অনলাইনে মধু কিনে আগে দুইবার প্রতারিত হয়েছিলাম। তাই এবার একটু ভয় ছিল। কিন্তু এই মধুর স্বাদ নেওয়ার পর মন ভরে গেছে। সাথে দেওয়া কাঠের মধু চামচটাও খুব সুন্দর। সবাই নিশ্চিন্তে নিতে পারেন।",
        packagePurchased: "১ কেজি জার",
        isVerified: true,
        isActive: true,
        sortOrder: 3,
      },
      {
        name: "মাহমুদুল হাসান",
        location: "সোনাডাঙ্গা, খুলনা",
        role: "ব্যাংক কর্মকর্তা",
        rating: 5,
        reviewText:
          "খুলনার মানুষ হিসেবে সুন্দরবনের মধুর আসল স্বাদ আমি ভালো করেই চিনি। এদের মধুটা সত্যিই ১০০% সুন্দরবনের চাকের মধু। কোনো সুগার সিরাপ নেই। আমি দ্বিতীয়বার ২ কেজির বড় কম্বো প্যাক অর্ডার করলাম।",
        packagePurchased: "২ কেজি ফ্যামিলি কম্বো",
        isVerified: true,
        isActive: true,
        sortOrder: 4,
      },
    ];

    for (const r of initialReviews) {
      await prisma.review.create({ data: r });
    }
    console.log("✅ Initial Reviews seeded");
  }

  // 6. Seed Customers & Initial Orders
  const sampleCustomers = [
    {
      name: "মোঃ আব্দুল্লাহ আল মামুন",
      phone: "01712345678",
      address: "বাড়ি ১২, রোড ৫, সেক্টর ৩, উত্তরা, ঢাকা",
      pkgId: pkg1kg.id,
      area: "inside_dhaka",
      shippingCost: 70,
      subTotal: 1200,
      totalAmount: 1270,
      status: "CONFIRMED",
      orderNumber: "SN-10021",
    },
    {
      name: "নাসরিন সুলতানা",
      phone: "01812345679",
      address: "হোল্ডিং ৪২, ওআর নিজাম রোড, পাঁচলাইশ, চট্টগ্রাম",
      pkgId: pkg2kg.id,
      area: "outside_dhaka",
      shippingCost: 0,
      subTotal: 2200,
      totalAmount: 2200,
      status: "DELIVERED",
      orderNumber: "SN-10022",
    },
    {
      name: "ডাঃ তানভীর আহমেদ",
      phone: "01912345680",
      address: "ফ্ল্যাট ৩বি, রোড ১১, বনানী, ঢাকা",
      pkgId: pkg1kg.id,
      area: "inside_dhaka",
      shippingCost: 70,
      subTotal: 1200,
      totalAmount: 1270,
      status: "PROCESSING",
      orderNumber: "SN-10023",
    },
    {
      name: "মোঃ রফিকুল ইসলাম",
      phone: "01612345681",
      address: "হাউস ৮, জিন্দাবাজার, সিলেট",
      pkgId: pkg500g.id,
      area: "outside_dhaka",
      shippingCost: 130,
      subTotal: 650,
      totalAmount: 780,
      status: "PENDING",
      orderNumber: "SN-10024",
    },
    {
      name: "মাহমুদুল হাসান",
      phone: "01512345682",
      address: "সোনাডাঙ্গা মেইন রোড, খুলনা",
      pkgId: pkg2kg.id,
      area: "outside_dhaka",
      shippingCost: 0,
      subTotal: 2200,
      totalAmount: 2200,
      status: "SHIPPED",
      orderNumber: "SN-10025",
    },
  ];

  for (const c of sampleCustomers) {
    const customer = await prisma.customer.upsert({
      where: { phone: c.phone },
      update: {
        name: c.name,
        address: c.address,
        totalOrders: 1,
        totalSpent: c.totalAmount,
        lastOrderDate: new Date(),
      },
      create: {
        name: c.name,
        phone: c.phone,
        address: c.address,
        totalOrders: 1,
        totalSpent: c.totalAmount,
        lastOrderDate: new Date(),
      },
    });

    await prisma.order.upsert({
      where: { orderNumber: c.orderNumber },
      update: {
        status: c.status,
      },
      create: {
        orderNumber: c.orderNumber,
        customerName: c.name,
        phone: c.phone,
        deliveryArea: c.area,
        shippingAddress: c.address,
        packageId: c.pkgId,
        quantity: 1,
        subTotal: c.subTotal,
        shippingCost: c.shippingCost,
        totalAmount: c.totalAmount,
        status: c.status,
        customerId: customer.id,
      },
    });
  }

  console.log("✅ Customers & Sample Orders seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
