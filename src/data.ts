import { Protocol } from './types';

export const DEEP_WORK_PROTOCOLS: Protocol[] = [
  {
    type: 'sprint',
    title: 'Short Deep Work Sprint',
    banglaTitle: '৩০ মিনিটের স্প্রিন্ট সেশন',
    totalDurationMinutes: 30,
    description: 'For quick urgent gains or building basic concentration. High intensity, short duration.',
    banglaDescription: 'যাদের মনোযোগ বেশিক্ষণ থাকে না বা কোনো ইমার্জেন্সি কাজ দ্রুত শেষ করতে হবে, তাদের জন্য।',
    phases: [
      {
        id: 'sprint-prepare',
        name: 'Activation (Prepare)',
        banglaName: 'অ্যাক্টিভেশন (প্রিপেয়ার)',
        category: 'prepare',
        baseDurationMinutes: 3,
        description: 'Prepare your workspace and center your attention.',
        banglaDescription: 'কাজের ডেস্কে বসুন এবং আপনার মনোযোগ এক জায়গায় করুন।',
        instructions: [
          { text: 'কাজের ডেস্কে বসুন এবং বডি পজিশন সোজা করুন।', done: false },
          { text: 'ডট ফোকাস: চোখ বন্ধ করে দোয়া পড়ুন বা দেয়ালে একটি নির্দিষ্ট বিন্দুর দিকে ১ মিনিট তাকিয়ে থাকুন।', done: false },
          { text: 'ভিজ্যুয়ালাইজ করুন যে আপনি ৩০ মিনিট পর কাজটা সফলভাবে শেষ করেছেন।', done: false }
        ],
        activeTips: [
          'ব্লিস স্টেশন সেটআপ করুন: কাজের জায়গা থেকে ফোন বা ডিস্ট্রাকশন দূরে রাখুন।',
          'বই, খাতা ও পানির বোতল হাতের কাছে রাখুন যাতে সেশনের মাঝখানে উঠতে না হয়।'
        ]
      },
      {
        id: 'sprint-perform',
        name: 'Deep Work (Perform)',
        banglaName: 'ডিপ ওয়ার্ক (পারফর্ম)',
        category: 'perform',
        baseDurationMinutes: 25,
        description: 'Immersive focus block. Keep distraction away.',
        banglaDescription: '১টি পোমোডোরো সেশন। সম্পূর্ণ একাকীত্বে কাজ করুন।',
        instructions: [
          { text: 'টানা ২৫ মিনিট কোনো দিকে না তাকিয়ে শুধু ওই নির্দিষ্ট কাজটা করুন।', done: false },
          { text: 'ভিন্ন চিন্তা আসলে সরিয়ে রাখুন এবং সরাসরি মূল ফোকাসে ব্যাক করুন।', done: false }
        ],
        activeTips: [
          'কোনো ট্যাব বা নোটিফিকেশন চেক করবেন না।',
          'একমুখী মনোভাব নিয়ে লক্ষ্যের ওপর ডাইভ দিন।'
        ]
      },
      {
        id: 'sprint-preserve',
        name: 'Closing (Preserve)',
        banglaName: 'ক্লোজিং (প্রিজার্ভ)',
        category: 'preserve',
        baseDurationMinutes: 2,
        description: 'Decompress, reflect and log your focus quality.',
        banglaDescription: 'কাজ শেষ করে একটি বড় স্বস্তির নিঃশ্বাস নিন এবং সেশন রেট করুন।',
        instructions: [
          { text: 'কাজ শেষ। একটা লম্বা স্বস্তির নিঃশ্বাস (Sigh of relief) ফেলুন।', done: false },
          { text: 'ল্যাপটপের ট্যাব বা বই সচেতনভাবে বন্ধ করুন।', done: false },
          { text: 'নিজেকে ১০-এর মধ্যে ফোকাস ও এনার্জির রেটিং দিয়ে সেশন রেকর্ড করুন।', done: false }
        ],
        activeTips: [
          'আজকের সেশনটি সম্পন্ন করার মাধ্যমে আপনার ব্রেইনকে সাফল্যের ডোপামিন দিন।',
          'পরবর্তী সেশন এর এনার্জি রিফিল করতে নিজের পিঠ চাপড়ে দিন।'
        ]
      }
    ]
  },
  {
    type: 'standard',
    title: 'Standard Active Session',
    banglaTitle: '১ ঘণ্টার স্ট্যান্ডার্ড সেশন',
    totalDurationMinutes: 60,
    description: 'Perfect for daily studies, regular projects, and writing code with a recovery interval.',
    banglaDescription: 'রেগুলার পড়াশোনা বা প্রজেক্টের কাজের জন্য সবচেয়ে আদর্শ ও বিজ্ঞানসম্মত ডিজাইন।',
    phases: [
      {
        id: 'std-prepare',
        name: 'Activation (Prepare)',
        banglaName: 'অ্যাক্টিভেশন (প্রিপেয়ার)',
        category: 'prepare',
        baseDurationMinutes: 3,
        description: 'Get ready with tactile stimulation and target alignment.',
        banglaDescription: 'স্পাইরাল টেকনিক বা ডট ফোকাস করে ব্রেইনকে কাজের সিগন্যাল দিন।',
        instructions: [
          { text: 'কাজের ডেস্কে বসুন এবং আপনার এক্সাক্ট টার্গেট ঠিক করুন।', done: false },
          { text: 'স্পাইরাল টেকনিক: খাতায় গোল গোল দাগ টেনে বা ডট ফোকাস করে ব্রেইনের এটেনশন রেডি করুন।', done: false },
          { text: 'সব ডিভাইস সাইলেন্ট ও দৃষ্টিসীমার বাইরে রাখুন।', done: false }
        ],
        activeTips: [
          'আপনার ডেস্কে শুধুমাত্র ৩টি জিনিস রাখুন: কাজ সম্পর্কিত বই/ফাইল, ডায়েরি/কাগজ ও পানি বোতলে জল।',
          'ক্ল্যারিটি ইজ পাওয়ার: ঠিক কী কাজ শেষ করে ডেস্কে দাঁড়িয়ে উঠবেন তা স্পষ্ট করুন।'
        ]
      },
      {
        id: 'std-work1',
        name: '1st Deep Work (Perform)',
        banglaName: '১ম ডিপ ওয়ার্ক (পারফর্ম)',
        category: 'perform',
        baseDurationMinutes: 25,
        description: 'First high-focus sprint of 25 minutes.',
        banglaDescription: 'সম্পূর্ণ ফোকাস দিয়ে প্রথম ২৫ মিনিট কাজ করুন।',
        instructions: [
          { text: 'পূর্ণ এনার্জি দিয়ে মূল কাজে যুক্ত হোন।', done: false },
          { text: 'স্ট্রেস লাগলে মুখে একটু ঠান্ডা পানির ঝাপটা দিয়ে আসুন (ডাইভিং রিফ্লেক্স)।', done: false }
        ],
        activeTips: [
          'ঠান্ডা জল চোখের পাতায় দিলে প্যারা-সিম্প্যাথিটিক নার্ভাস সিস্টেম সজাগ হয় (ডাইভিং রিফ্লেক্স)।',
          'শুরুর ৫-১০ মিনিট অনেক সময় মনোযোগ বসতে চায় না, জোর করে লেগে থাকুন।'
        ]
      },
      {
        id: 'std-recharge',
        name: 'Box Breathing Break (Perform)',
        banglaName: 'বক্স ব্রিদিং ব্রেক (পারফর্ম)',
        category: 'perform',
        baseDurationMinutes: 5,
        description: 'Screen-free active recharge with box breathing.',
        banglaDescription: '৫ মিনিটের ফোনহীন বিজ্ঞানসম্মত শান্ত বিরতি।',
        instructions: [
          { text: 'ফোন একদম ধরবেন না! কোনো ওয়েবসাইট বা মেসেজ খোলা নিষিদ্ধ।', done: false },
          { text: 'পানি পান করুন এবং ১-২ টা বাদাম বা খেজুর মুখে দিন।', done: false },
          { text: 'চোখ বন্ধ করে বক্স ব্রিদিং (Inhale 4s, Hold 4s, Exhale 4s, Hold 4s) করুন।', done: false }
        ],
        activeTips: [
          'ব্রেক মানে প্রজ্ঞাহীন স্ক্রল করা নয়, বরং ব্রেইনের নোরেপিনেফ্রিন ও ডোপামিন রিফিল করা।',
          'ঘরের ভেতর বা ডেস্কে চোখ বন্ধ করে লম্বা শ্বাস নিন।'
        ]
      },
      {
        id: 'std-work2',
        name: '2nd Deep Work (Perform)',
        banglaName: '২য় ডিপ ওয়ার্ক (পারফর্ম)',
        category: 'perform',
        baseDurationMinutes: 25,
        description: 'Second and final sprint. Manage emergent random thoughts.',
        banglaDescription: 'পুনরায় কাজে ফিরে আসুন। মাথায় জমা চিন্তা আলাদা করার ধাপ।',
        instructions: [
          { text: 'দ্বিতীয় ২৫ মিনিটের ডিপ সেশনে মনোযোগ দিন।', done: false },
          { text: 'অন্য কাজের কথা মনে পড়লে Worry Postponement খাতায় আলতো করে লিখে ছেড়ে দিন।', done: false }
        ],
        activeTips: [
          'Worry Postponement: "হঠাৎ মনে পড়া বিল দেয়া বা রিডায়াল করার কথা" কাগজে লিখে রাখুন যাতে মন দুশ্চিন্তাহীন থাকে।',
          'আর মাত্র ২৫ মিনিট, আপনার সর্বোচ্চ একাগ্রতা ঢেলে দিন।'
        ]
      },
      {
        id: 'std-preserve',
        name: 'Closing (Preserve)',
        banglaName: 'ক্লোজিং ও প্রিজারভেশন',
        category: 'preserve',
        baseDurationMinutes: 2,
        description: 'Reorganize and register insights in state.',
        banglaDescription: 'টেবিল গুছিয়ে সৃষ্টিকর্তার কাছে কৃতজ্ঞতা প্রকাশ করুন।',
        instructions: [
          { text: 'কাজ শেষ করে টেবিল ও ডেকোরেশন গুছিয়ে রাখুন।', done: false },
          { text: 'আজকের ফোকাস সেশনের জন্য সৃষ্টিকর্তার কাছে কৃতজ্ঞতা প্রকাশ করুন।', done: false },
          { text: 'আপনার ফোকাস ও এনার্জির রেটিং দিয়ে সেশন রেকর্ড করুন।', done: false }
        ],
        activeTips: [
          'টেবিল পরিষ্কার রাখা আগামীকালের সেশনের জন্য "প্রিপেয়ার" ফেজকে ৯০% সহজ করে দেয়।',
          'কৃতজ্ঞতাবোধ ও সাফল্য ডায়েরি ফোকাস হরমোন উন্নত করতে সাহায্য করে।'
        ]
      }
    ]
  },
  {
    type: 'advanced',
    title: 'Advanced Flows (Ultradian)',
    banglaTitle: '১ ঘণ্টা ৩০ মিনিটের সেশন',
    totalDurationMinutes: 90,
    description: 'Based on Ultradian rhythms where focus peaks over a longer single duration.',
    banglaDescription: 'যাদের একটানা লম্বা সময় কাজ করার অভ্যাস আছে (Ultradian Rhythm)।',
    phases: [
      {
        id: 'adv-prepare',
        name: 'Target & Activation (Prepare)',
        banglaName: 'টার্গেট ও অ্যাক্টিভেশন (প্রিপেয়ার)',
        category: 'prepare',
        baseDurationMinutes: 5,
        description: 'Target locking, prayer, and deep visualization.',
        banglaDescription: 'কাজের টার্গেট ফিক্স করে ভিজ্যুয়ালাইজেশন শেষ করার ধাপ।',
        instructions: [
          { text: 'আজকের কাজের এক্সাক্ট টার্গেটের সীমানা নির্ধারণ করুন।', done: false },
          { text: 'ফোন সম্পূর্ণ দূরে রাখুন এবং দরকারি ফাইল আগে থেকে ডেস্কে রাখুন।', done: false },
          { text: 'চোখ বন্ধ করে শান্ত মনে দোয়া পড়ুন অথবা ভিজ্যুয়ালাইজ করুন।', done: false }
        ],
        activeTips: [
          '৯০ মিনিটের সেশনের জন্য পানির চাহিদা বেশি, তাই বড় জলের বোতল সামনে রাখুন।',
          'মনকে সংকল্প দিন: "আমি আগামী ১ ঘণ্টা ২৫ মিনিট শুধু এই কাজেই লিপ্ত থাকবো।"'
        ]
      },
      {
        id: 'adv-work1',
        name: '1st Heavy Work (Perform)',
        banglaName: '১ম হেভি ডিপ ওয়ার্ক (পারফর্ম)',
        category: 'perform',
        baseDurationMinutes: 40,
        description: 'First extended flow of 40 minutes.',
        banglaDescription: 'একটানা ৪০ মিনিট কাজ করুন যখন এনার্জি ও ফোকাস লেভেল তুঙ্গে থাকে।',
        instructions: [
          { text: 'কোনো বিরতি ছাড়া ফুল স্পিডে কাজ এগিয়ে নিন।', done: false },
          { text: 'কোনো সামাজিক যোগাযোগ মাধ্যম বা ইন্টারনেট পেজ যা ক্ষতিকর তা ব্লক রাখুন।', done: false }
        ],
        activeTips: [
          'শুরুতে এনার্জি বেশি থাকে, তাই প্রথম সেশনটা স্বাভাবিকভাবেই ২৫ মিনিটের চেয়ে লম্বা হবে (৪০ মিনিট)।',
          'যদি মন এদিক-সেদিক যেতে চায় তবে গভীর শ্বাস নিয়ে পুনরাবৃত্তি করুন।'
        ]
      },
      {
        id: 'adv-recharge',
        name: 'Active Walk Rest (Perform)',
        banglaName: 'অ্যাক্টিভ লম্বা ব্রেক (পারফর্ম)',
        category: 'perform',
        baseDurationMinutes: 10,
        description: 'Physically active rest block of 10 minutes.',
        banglaDescription: '১০ মিনিটের কায়িক বিরতি। ফোন দেখা সম্পূর্ণ নিষিদ্ধ।',
        instructions: [
          { text: 'চেয়ার বা কাজের টেবিল থেকে সম্পূর্ণ উঠে দাঁড়ান।', done: false },
          { text: 'রুমের ভেতর বা ছাদে একটু হাঁটাহাঁটি করুন।', done: false },
          { text: 'পানি ও এনার্জি ফুড (খেজুর/দুধ/বাদাম) খান।', done: false }
        ],
        activeTips: [
          'ফোন বা ডিসপ্লে সম্পূর্ণ নিষিদ্ধ! পর্দা বা কোনো মেসেঞ্জার স্পর্শ করবেন না।',
          'হাঁটাহাঁটির মাধ্যমে ব্রেইন সেলগুলোতে পর্যাপ্ত অক্সিজেন ও রক্ত সঞ্চালন বৃদ্ধি পায়।'
        ]
      },
      {
        id: 'adv-work2',
        name: '2nd Work Sprint (Perform)',
        banglaName: '২য় ডিপ ওয়ার্ক (পারফর্ম)',
        category: 'perform',
        baseDurationMinutes: 30,
        description: 'Final 30-minute high intensity focus block.',
        banglaDescription: 'পুনরায় ফোকাস দিয়ে ৩০ মিনিট কাজ করার চূড়ান্ত ধাপ।',
        instructions: [
          { text: 'আবার ফুল ফোকাসে কাজে ঢুকে যান।', done: false },
          { text: 'বাকি লক্ষ্যমাত্রা অর্জনে সবটুকু স্পিড বজায় রাখুন।', done: false }
        ],
        activeTips: [
          'এই ধাপে ক্লান্তি লাগাটা স্বাভাবিক, কিন্তু মনে রাখবেন— শেষ ভালো যার, সব ভালো তার!',
          'আপনার ব্রেইন এখন রিফ্রেশড অবস্থায় আছে।'
        ]
      },
      {
        id: 'adv-preserve',
        name: 'Preserve & Log Distractions',
        banglaName: 'ক্লোজিং ও ডিস্ট্রাকশন লক',
        category: 'preserve',
        baseDurationMinutes: 5,
        description: 'Review distractions, shut down responsibly and log data.',
        banglaDescription: 'আজকের ক্ষতিকর ডিস্ট্রাকশনগুলো খাতায় লিখে নিজেকে মূল্যায়ন করুন।',
        instructions: [
          { text: 'কাজ শেষ। ব্রাউজার ট্যাব, প্রোগ্রাম বা বই সচেতনভাবে বন্ধ করুন।', done: false },
          { text: 'আজকের ডিস্ট্রাকশনগুলো কী কী ছিল তা ডায়েরিতে বা নিচে লিখে রাখুন।', done: false },
          { text: 'ফোকাস, এনার্জি এবং ১০-এর মধ্যে সন্তুষ্টির রেটিং প্রদান করুন।', done: false }
        ],
        activeTips: [
          'ডিস্ট্রাকশন লিখে রাখা এক ধরণের কগনিটিভ রিফ্লেকশন, যা পরবর্তী সেশনে ডিস্ট্রাকশন ৫২% কমিয়ে আনে।',
          'ডেস্ক গুছিয়ে আগামীকালের আমন্ত্রণ সাজান।'
        ]
      }
    ]
  },
  {
    type: 'master',
    title: 'Master Marathon Session',
    banglaTitle: '২ ঘণ্টার মাস্টার সেশন',
    totalDurationMinutes: 120,
    description: 'Deep work marathon optimized with power naps and advanced cognitive diffusion strategies.',
    banglaDescription: 'পরীক্ষার আগের রাত বা বড় কোনো কঠিন প্রজেক্ট শেষ করার জন্য বিশেষ ডিজাইনকৃত ম্যারাথন সেশন।',
    phases: [
      {
        id: 'master-prepare',
        name: 'STOP Setup (Prepare)',
        banglaName: 'অ্যাক্টিভেশন ও STOP টেকনিক (প্রিপেয়ার)',
        category: 'prepare',
        baseDurationMinutes: 5,
        description: 'Stop, Take breath, Observe, Proceed strategy.',
        banglaDescription: 'সব রিসোর্স বা ফাইল হাতের কাছে নিয়ে মন শান্ত করার ধাপ।',
        instructions: [
          { text: 'আপনার সম্পূর্ণ রিসোর্স, পানি, ফাইল বা রেফারেন্স চেক করুন।', done: false },
          { text: 'STOP টেকনিক ফলো করুন: S - Stop (কাজের আগে থমকে যান), T - Take a breath (৩টা গভীর শ্বাস নিন), O - Observe (শরীরের উত্তেজনা খেয়াল করুন), P - Proceed (শান্ত মনে কাজে নামুন)।', done: false },
          { text: 'সমস্ত ডিভাইস সম্পূর্ণ সাইলেন্ট মোডে দূরের রুমে রেখে আসুন।', done: false }
        ],
        activeTips: [
          '২ ঘণ্টা অনেক বড় সময়, তাই ডেস্কে কোনো অপ্রয়োজনীয় বই রাখবেন না।',
          'বডি ও মাইন্ড শিথিল করে সংকল্প স্থির করুন।'
        ]
      },
      {
        id: 'master-work1',
        name: 'Ultradian Block (Perform)',
        banglaName: '১ম আলট্রাডিয়ান ব্লক (পারফর্ম)',
        category: 'perform',
        baseDurationMinutes: 50,
        description: '50-minute fully isolated deep work sprint.',
        banglaDescription: 'বাইরের পৃথিবী থেকে সম্পূর্ণ বিচ্ছিন্ন হয়ে একমুখী গভীর মনোযোগে ডুবে যান।',
        instructions: [
          { text: 'এই ৫০ মিনিট আপনি বাইরের পৃথিবী থেকে সম্পূর্ণ বিচ্ছিন্ন।', done: false },
          { text: 'নেগেটিভ বা উত্যক্ত চিন্তা আসলে "ACCEPTS" টেকনিক বা "কগনিティブ ডিফিউশন" ব্যবহার করুন: মনকে বলুন— "এই ফিলিংটা কাজের শেষে দেখবো, এখন মন দিচ্ছি।"', done: false }
        ],
        activeTips: [
          'কগনিティブ ডিফিউশন: বিভ্রান্তি বা আলসেমির চিন্তাগুলোকে মেঘের মতো ভেসে যেতে দিন, সেগুলোর সাথে তর্কে জড়াবেন না।',
          'কাজের মধ্যে অন্য কোনো নোটিফিকেশন ট্যাব খোলা দণ্ডনীয় অপরাধ।'
        ]
      },
      {
        id: 'master-powernap',
        name: 'Power Break & Rest (Perform)',
        banglaName: '১৫ মিনিটের পাওয়ার ব্রেক (পারফর্ম)',
        category: 'perform',
        baseDurationMinutes: 15,
        description: 'Eye rest or power nap. Complete neural recovery.',
        banglaDescription: 'মস্তিষ্কের এনার্জি রিচার্জ করতে ১৫ মিনিটের চোখের রেস্ট বা শুয়ে থাকা।',
        instructions: [
          { text: 'টানা কাজের পর ব্রেইন টায়ার্ড হবেই। ব্রেক শুরু করুন।', done: false },
          { text: 'এই ১৫ মিনিট চোখের রেস্ট নিন, সোজা হয়ে শুয়ে থাকুন বা পাওয়ার ন্যাপ নিন।', done: false },
          { text: 'পর্যাপ্ত পানি ও কিছু ফল/খেজুর মুখে দিন। ফোন স্পর্শ করবেন না।', done: false }
        ],
        activeTips: [
          'এই ব্রেকটি ক্ষতিকর ডোপামিন হর্স-রেস থেকে ব্রেইন সেলগুলোকে রক্ষা করতে তৈরি করা হয়েছে।',
          'সোজা হয়ে শুয়ে থাকলে বা চোখ বন্ধ রাখলে ব্রেইন এর আলফা ওয়েভ সক্রিয় হয় ও কড়া লার্নিং স্টোর করে।'
        ]
      },
      {
        id: 'master-work2',
        name: 'Final Sprint (Perform)',
        banglaName: 'ফাইনাল স্প্রিন্ট (পারফর্ম)',
        category: 'perform',
        baseDurationMinutes: 45,
        description: '45-minute post-rest acceleration block.',
        banglaDescription: 'রিফ্রেশড ব্রেইনে চূড়ান্ত উদ্দীপনায় বাকি কাজটুকু শেষ করুন।',
        instructions: [
          { text: 'রেকর্ড স্পিডে বাকি থাকা কাজটুকু গুছিয়ে আনুন।', done: false },
          { text: 'আটকে যাওয়া কঠিন টপিকগুলো এখন ধরুন কারণ ব্রেইন এখন ফ্রেশ ও রিচার্জড।', done: false }
        ],
        activeTips: [
          'রেস্টের পর ব্রেইন আবার রিফ্রেশড ও শার্প। এই ৪৫ মিনিটে আপনি অসম্ভবকেও সম্ভব করতে পারবেন!',
          'লক্ষ্যের একদম কাছাকাছি চলে এসেছেন, পুরো উদ্যমে ঝাপিয়ে পড়ুন।'
        ]
      },
      {
        id: 'master-preserve',
        name: 'Preservation Setup (Preserve)',
        banglaName: 'ক্লোজিং ও প্রিজারভেশন',
        category: 'preserve',
        baseDurationMinutes: 5,
        description: 'Sigh of relief, deep cleaning desktop, complete focus ratings.',
        banglaDescription: 'টেবিল গুছিয়ে একদম নতুনের মতো করে রেখে নিজেকে স্বস্তির উপহার দিন।',
        instructions: [
          { text: 'কাজ শেষে একটি বড় ও তৃপ্তিদায়ক স্বস্তির নিঃশ্বাস ফেলুন।', done: false },
          { text: 'টেবিল গুছিয়ে একদম নতুনের মতো পরিষ্কার রাখুন যাতে আগামীকাল এসে আবার ফ্রেশভাবে শুরু করতে পারেন।', done: false },
          { text: 'ফোকাস, এনার্জি ও স্যাটিসফেকশনের রেটিং দিয়ে সেশন রেকর্ড করুন।', done: false }
        ],
        activeTips: [
          'অভিনন্দন! আপনি ১২০ মিনিটের একটি সফল গভীর ফ্লো অর্জন করেছেন!',
          'নিজে স্বস্তির নিঃশ্বাস ফেলুন এবং ব্রেইনকে এই সফলতার পুরস্কার দিন।'
        ]
      }
    ]
  },
  {
    type: 'adhd',
    title: 'ADHD Micro Session (30m)',
    banglaTitle: 'ADHD ৩০ মিনিটের "মাইক্রো" সেশন',
    totalDurationMinutes: 30,
    isAdhd: true,
    description: '15-5-10 model designed for ADHD brains. High physical movement, short sprints, continuous dopamine supply.',
    banglaDescription: 'ADHD-বান্ধব ৩০ মিনিটের সেশন। কাজগুলোকে ছোট করা, একটি অ্যাক্টিভ মুভমেন্ট ব্রেক নেওয়া এবং কন্টিনিউয়াস ডোপামিন সাপ্লাই রাখা।',
    phases: [
      {
        id: 'adhd-micro-prepare',
        name: 'Activation (Prepare)',
        banglaName: 'অ্যাক্টিভেশন (প্রস্তুতি - ২ মিনিট)',
        category: 'prepare',
        baseDurationMinutes: 2,
        description: 'Backward counting 5 to 1 to activate the prefrontal cortex.',
        banglaDescription: '৫ থেকে ১ পর্যন্ত উল্টো গণনা (Backward Counting) করে ব্রেইনের প্রি-ফ্রন্টাল কর্টেক্সকে সজাগ করুন।',
        instructions: [
          { text: '৫ থেকে ১ পর্যন্ত অত্যন্ত ধীরে ধীরে এবং সচেতনভাবে উল্টো গণনা (Backward Counting) করুন।', done: false },
          { text: 'চোখের সামনের সব ডিস্ট্রাকশন হাতের নাগালের বাইরে সরিয়ে ফেলুন।', done: false }
        ],
        activeTips: [
          'সময় চোখে দেখা জরুরি: সামনে একটি এনালগ টাইমার বা স্যান্ডগ্লাস (বালুঘড়ি) রাখুন। সময় কমছে— এটা চোখে দেখলে ADHD ব্রেইন কাজ করার তাগিদ (Urgency) পায়।',
          'ফিজেট টুলস: কাজ করার সময় হাত বা পা একটু নাড়াচাড়া করতে হাতে একটা স্ট্রেস বল বা স্পিনার রাখতে পারেন।'
        ]
      },
      {
        id: 'adhd-micro-work1',
        name: '1st Deep Work (Perform)',
        banglaName: '১ম ডিপ ওয়ার্ক (পারফর্ম - ১৫ মিনিট)',
        category: 'perform',
        baseDurationMinutes: 15,
        description: 'First 15-minute ultra-short focus sprint.',
        banglaDescription: '১৫ মিনিটের জন্য একটি খুব ছোট কাজ করুন (যেমন: ১টি অংক করা বা ১টি ইমেইল লেখা)।',
        instructions: [
          { text: 'শুধু ১৫ মিনিটের জন্য একটি খুব ছোট কাজ করুন। বড় কাজের বোঝা মাথায় নেবেন না।', done: false },
          { text: 'কাজের মাঝে কোনো রেনডম চিন্তা আসলে সাথে সাথে পাশে সাদা কাগজে (ডিস্ট্রাকশন ডাম্প প্যাড) লিখে আবার কাজে ফিরুন।', done: false }
        ],
        activeTips: [
          'ডিস্ট্রাকশন ডাম্প প্যাড: পাশে একটা সাদা কাগজ রাখুন। রেনডম চিন্তা এলেই লিখে রাখুন যাতে ব্রেইন রিল্যাক্স হতে পারে।'
        ]
      },
      {
        id: 'adhd-micro-break',
        name: 'Active Break (Perform)',
        banglaName: 'অ্যাক্টিভ ব্রেক (৩ মিনিট)',
        category: 'perform',
        baseDurationMinutes: 3,
        description: 'Quick physical stretching or walking around.',
        banglaDescription: 'চেয়ার থেকে উঠে একটু স্ট্রেচিং করুন বা ঘরের মধ্যে হাঁটাহাঁটি করুন।',
        instructions: [
          { text: 'চেয়ার থেকে উঠে দাঁড়িয়ে হাত-পা একটু স্ট্রেচ করুন।', done: false },
          { text: 'ঘরের মধ্যে পায়চারি করুন বা একটু নড়াচড়া করুন। (ADHD ব্রেইন ফিজিক্যাল মুভমেন্ট ছাড়া শান্ত থাকতে পারে না)।', done: false },
          { text: 'ফোন একদম স্পর্শ করবেন না।', done: false }
        ],
        activeTips: [
          'ব্রেকের সময় ফোন ঘাঁটলে ফোকাস নষ্ট হয়ে যাবে। শুধু ফিজিক্যাল মুভমেন্ট করুন।'
        ]
      },
      {
        id: 'adhd-micro-work2',
        name: '2nd Deep Work (Perform)',
        banglaName: '২য় ডিপ ওয়ার্ক (পারফর্ম - ৯ মিনিট)',
        category: 'perform',
        baseDurationMinutes: 9,
        description: 'Second and final 9-minute focus sprint.',
        banglaDescription: 'বাকি সময়টুকু আগের কাজের রিভিউ বা ছোট একটা অংশ শেষ করুন।',
        instructions: [
          { text: 'পুনরায় আগের কাজে ফিরুন এবং কাজের অসমাপ্ত অংশটুকু বা রিভিউ শেষ করুন।', done: false },
          { text: 'কোনো ডিস্ট্রাকশন আসলে পাশে ডাম্প প্যাডে লিখে রাখুন।', done: false }
        ],
        activeTips: [
          'আর মাত্র ৯ মিনিট, তারপর কাজ কেটে দিয়ে আপনি ডোপামিন রিওয়ার্ড পাবেন।'
        ]
      },
      {
        id: 'adhd-micro-preserve',
        name: 'Closing (Preserve)',
        banglaName: 'ক্লোজিং (প্রিজার্ভ - ১ মিনিট)',
        category: 'preserve',
        baseDurationMinutes: 1,
        description: 'Ticking off task to gain immediate dopamine boost.',
        banglaDescription: 'কাগজে কাজটা কেটে দিয়ে ব্রেইনকে তাৎক্ষণিক ডোপামিন দিন।',
        instructions: [
          { text: 'কাগজে বা টার্গেটে কাজটা পেন দিয়ে কেটে দিন (টিক চিহ্ন দিন)। এটি ব্রেইনে তাৎক্ষণিক ডোপামিন দেয়।', done: false },
          { text: 'সেশনটি রেটিং দিন এবং সম্পন্ন করার জন্য নিজেকে ধন্যবাদ জানান।', done: false }
        ],
        activeTips: [
          'পারফেকশনের জন্য দৌড়াবেন না। শুরু করতে পারাটাই ADHD ব্রেইনের সবচেয়ে বড় জয়!'
        ]
      }
    ]
  },
  {
    type: 'adhd',
    title: 'ADHD Momentum Session (1h)',
    banglaTitle: 'ADHD ১ ঘণ্টার "মোমেন্টাম" সেশন',
    totalDurationMinutes: 60,
    isAdhd: true,
    description: '20-10-20-10 Pomodoro variation for ADHD. Motivation diffusion and glucose recovery break included.',
    banglaDescription: 'স্ট্যান্ডার্ড পোমোডোরোর বদলে ADHD-র জন্য ২০-১০-২০-১০ মডেল ব্যবহার করা হবে, যা কাজে মোমেন্টাম তৈরি করতে সাহায্য করে।',
    phases: [
      {
        id: 'adhd-momentum-prepare',
        name: 'Motivation Diffusion (Prepare)',
        banglaName: 'মোটিভেশন ডিফিউশন (প্রস্তুতি - ৩ মিনিট)',
        category: 'prepare',
        baseDurationMinutes: 3,
        description: 'Overcoming starting friction by pledging a 2-minute effort.',
        banglaDescription: '"আমার এখন কাজ করতে ইচ্ছা করছে না, কিন্তু আমি জাস্ট ২ মিনিটের জন্য বই বা এডিটর খুলবো।"',
        instructions: [
          { text: 'নিজেকে বলুন— "আমি জাস্ট ২ মিনিটের জন্য কাজটি শুরু করবো।" (ADHD ব্রেইনকে শুরু করানোই সবচেয়ে কঠিন)।', done: false },
          { text: 'ডেস্ক পরিষ্কার করে ডিস্ট্রাকশন ডাম্প প্যাড এবং পানির গ্লাস পাশে সাজিয়ে নিন।', done: false }
        ],
        activeTips: [
          'মোটিভেশন ডিফিউশন টেকনিক: কাজের প্রথম বাধাটা কাটানোর জন্য মনকে বোঝান যে আপনি কেবল ২ মিনিট করবেন।'
        ]
      },
      {
        id: 'adhd-momentum-work1',
        name: '1st Focus Block (Perform)',
        banglaName: '১ম ফোকাস (পারফর্ম - ২০ মিনিট)',
        category: 'perform',
        baseDurationMinutes: 20,
        description: 'First 20-minute focus block.',
        banglaDescription: 'টাইমার অন করে শুধু এই ২০ মিনিটের জন্য ডুবে যান।',
        instructions: [
          { text: 'টাইমার অন করে সম্পূর্ণ একাগ্রতার সাথে কাজে নেমে পড়ুন।', done: false },
          { text: 'মাঝপথে ডিস্ট্রাক্টিং চিন্তা আসলেই ঝটপট ডাম্প প্যাডে লিখে কাজে ফিরে যান।', done: false }
        ],
        activeTips: [
          '২০ মিনিট অত্যন্ত ছোট ও ডু-এবল সময়। জাস্ট ডুবে যান।'
        ]
      },
      {
        id: 'adhd-momentum-break',
        name: 'High-Energy Break (Perform)',
        banglaName: 'হাই-এনার্জি ব্রেক (৫ মিনিট)',
        category: 'perform',
        baseDurationMinutes: 5,
        description: 'Splashing cold water and glucose replenishment.',
        banglaDescription: 'ফোন স্পর্শ না করে ঠান্ডা পানির ঝাপটা এবং ব্রেইন গ্লুকোজ রিফিল করা।',
        instructions: [
          { text: 'ফোন একদম ধরবেন না! এর বদলে একটু ঠান্ডা পানি মুখে দিন (ডাইভিং রিফ্লেক্স সক্রিয় করে)।', done: false },
          { text: 'কিছু বাদাম, চকলেট বা খেজুর খান (গ্লুকোজ ব্রেইনকে শান্ত ও ফোকাসড করে)।', done: false }
        ],
        activeTips: [
          'খাদ্যে থাকা প্রাকৃতিক চিনি ব্রেইন সেলের নোরেপিনেফ্রিন ও গ্লুকোজ লেভেল দ্রুত রিফিল করতে সাহায্য করে।'
        ]
      },
      {
        id: 'adhd-momentum-work2',
        name: '2nd Focus Block (Perform)',
        banglaName: '২য় ফোকাস (পারফর্ম - ২০ মিনিট)',
        category: 'perform',
        baseDurationMinutes: 20,
        description: 'Second 20-minute focus block.',
        banglaDescription: 'আবার কাজে ফিরে ২০ মিনিটের একটি সফল ব্লক সম্পূর্ণ করার চেষ্টা করুন।',
        instructions: [
          { text: 'আবার কাজে বসুন. আগের মতোই ডিস্ট্রাকশন ডাম্প প্যাড সচল রাখুন।', done: false },
          { text: 'কাজটি ২০ মিনিটে যতটুকু শেষ করা যায় করুন, কোনো চাপ নেবেন না।', done: false }
        ],
        activeTips: [
          'যদি কাজ করতে বিরক্তি লাগে তবে একটু দাঁড়িয়ে বা সোজা হয়ে বসুন।'
        ]
      },
      {
        id: 'adhd-momentum-preserve',
        name: 'Closing & Decompression (Preserve)',
        banglaName: 'ক্লোজিং ও ডিকম্প্রেশন (১২ মিনিট)',
        category: 'preserve',
        baseDurationMinutes: 12,
        description: 'Long break, desk cleanup, physiological sigh and self-rating.',
        banglaDescription: 'টেবিল গুছিয়ে লম্বা ব্রেক ও বড় স্বস্তির নিঃশ্বাস নেওয়া ও নিজেকে রেটিং দেওয়া।',
        instructions: [
          { text: 'কাজ শেষে বড় স্বস্তির নিঃশ্বাস নিন এবং সম্পন্ন কাজের গায়ে পেন দিয়ে কেটে দিন।', done: false },
          { text: 'ডেস্কের ক্লাটার পরিষ্কার করে গুছিয়ে ফেলুন।', done: false },
          { text: 'নিজেকে আজকের ফোকাসের ভিত্তিতে রেটিং দিয়ে সেশন সেভ করুন।', done: false }
        ],
        activeTips: [
          'একটি লম্বা ব্রেক নিন। আপনি ১ ঘণ্টার একটি সুন্দর সেশন সফলভাবে পার করেছেন!'
        ]
      }
    ]
  },
  {
    type: 'adhd',
    title: 'ADHD Ultradian Session (1.5h)',
    banglaTitle: 'ADHD ১ ঘণ্টা ৩০ মিনিটের "আলট্রাডিয়ান" সেশন',
    totalDurationMinutes: 90,
    isAdhd: true,
    description: 'For ADHD users who can maintain longer focus with background audio masking and desk de-cluttering.',
    banglaDescription: 'যাদের ওষুধ বা অভ্যাসের কারণে মনোযোগ কিছুটা দীর্ঘ হয়েছে, তাদের জন্য বিশেষভাবে কাস্টমাইজড আলট্রাডিয়ান সেশন।',
    phases: [
      {
        id: 'adhd-ultra-prepare',
        name: 'Visual De-clutter & Activation (Prepare)',
        banglaName: 'ভিজ্যুয়াল ডিক্লাটার (প্রস্তুতি - ৫ মিনিট)',
        category: 'prepare',
        baseDurationMinutes: 5,
        description: 'Desk clearing leaving only 1 critical item, audio masking setup.',
        banglaDescription: 'ডেসকে কেবল একটি কাজ রেখে বাকি সব চোখের আড়ালে করা এবং গান রেডি করা।',
        instructions: [
          { text: 'কাজের জায়গা সম্পূর্ণ পরিষ্কার করুন। ডেস্কে শুধু ১টা জিনিস থাকবে, বাকি সব আড়ালে। (ADHD ব্রেইন ভিজ্যুয়াল ক্লাটারে কনফিউজড হয়)।', done: false },
          { text: 'হেডফোনে Brown Noise বা Lofi beats প্লে করার জন্য রেডি করুন।', done: false }
        ],
        activeTips: [
          'ভিজ্যুয়াল ক্ল্যারিটি ADHD ব্রেইনে এটেনশন ডাইভার্ট হওয়া অনেকাংশে রোধ করে।'
        ]
      },
      {
        id: 'adhd-ultra-work1',
        name: '1st Deep Work (Perform)',
        banglaName: '১ম ডিপ ওয়ার্ক (পারফর্ম - ৩০ মিনিট)',
        category: 'perform',
        baseDurationMinutes: 30,
        description: 'First 30-minute focus block with audio masking.',
        banglaDescription: 'ব্রাউন নয়েজ বা লো-ফাই মিউজিক কানে লাগিয়ে ৩০ মিনিট কাজ করুন।',
        instructions: [
          { text: 'হেডফোনে Brown Noise বা Lofi Beats ছেড়ে কাজে ডুব দিন (এটি এক্সটার্নাল ডিস্ট্রাকশন থেকে ব্রেইনকে শিল্ড করে)।', done: false },
          { text: '৩০ মিনিট একটানা কাজ করার চেষ্টা করুন, ডিস্ট্রাকশন আসলেই ডাম্প প্যাডে লিখুন।', done: false }
        ],
        activeTips: [
          'ব্রাউন নয়েজ কানের পর্দায় একটি কনস্ট্যান্ট ফ্রিকোয়েন্সি দেয় যা ADHD ব্রেইনের এক্সটার্নাল নয়েজ সিকার অংশকে শান্ত রাখে।'
        ]
      },
      {
        id: 'adhd-ultra-break',
        name: 'Movement Break (Perform)',
        banglaName: 'মুভমেন্ট ব্রেক (১০ মিনিট)',
        category: 'perform',
        baseDurationMinutes: 10,
        description: 'Desk separation, walking and box breathing.',
        banglaDescription: 'ডেস্কে বসে না থেকে বাইরে গিয়ে বাতাস খাওয়া এবং বক্স ব্রিদিং প্র্যাকটিস করার বিরতি।',
        instructions: [
          { text: 'ডেস্কে বসে থাকবেন না। একটু রুমের বাইরে গিয়ে বাতাস খান।', done: false },
          { text: 'চোখ বন্ধ করে শান্ত মনে বক্স ব্রিদিং (বক্স ব্রিদিং গাইড ব্যবহার করতে পারেন) করুন।', done: false },
          { text: 'এক গ্লাস পানি পান করে ব্রেইন সেলে অক্সিজেন সরবরাহ বাড়ান। phone স্পর্শ করবেন না।', done: false }
        ],
        activeTips: [
          'শারীরিক মুভমেন্ট ব্রেইনের মোটর কর্টেক্সকে উদ্দীপ্ত করে, যা পরবর্তী সেশনের মনোযোগ রিফিল করে।'
        ]
      },
      {
        id: 'adhd-ultra-work2',
        name: '2nd Deep Work (Perform)',
        banglaName: '২য় ডিপ ওয়ার্ক (পারফর্ম - ৪০ মিনিট)',
        category: 'perform',
        baseDurationMinutes: 40,
        description: 'Second 40-minute focus block. Change physical workspace if needed.',
        banglaDescription: 'ব্রেইন এখন ফ্রেশ, তাই এটি একটু লম্বা সেশন। বোরিং লাগলে কাজের জায়গা বদলে ফেলুন।',
        instructions: [
          { text: 'পরবর্তী ৪০ মিনিটের সেশনে মনোযোগ দিন। এটি এনার্জি রিফিলের পর হওয়ায় একটু লম্বা হবে।', done: false },
          { text: 'যদি এই সময়ে কাজ করতে বিরক্তি (Under-stimulation) লাগে, তবে কাজের জায়গা বদলে মেঝেতে বা বিছানায় বা অন্য টেবিলে বসুন।', done: false }
        ],
        activeTips: [
          'কাজের জায়গা বদলানো (Novelty) ADHD ব্রেইনে নতুন উদ্দীপনা ও ডোপামিন দেয়।'
        ]
      },
      {
        id: 'adhd-ultra-preserve',
        name: 'Closing & Progress Logging (Preserve)',
        banglaName: 'ক্লোজিং ও প্রোগ্রেস লগ (৫ মিনিট)',
        category: 'preserve',
        baseDurationMinutes: 5,
        description: 'Close browser tabs, write progress, physiological sigh.',
        banglaDescription: 'বই বা ল্যাপটপ বন্ধ করা, খাতায় কাজের অগ্রগতি লিখে স্বস্তির নিঃশ্বাস ফেলা।',
        instructions: [
          { text: 'কাজ শেষ করে সমস্ত ব্রাউজার ট্যাব বা বই সচেতনভাবে বন্ধ করুন।', done: false },
          { text: 'আজকের ফোকাস সেশনে সম্পন্ন করা কাজগুলো খাতায় লিখে কেটে দিন এবং নিজেকে রেট করুন।', done: false }
        ],
        activeTips: [
          'আজকের সেশনটি সফল করার মাধ্যমে আপনি ১ ঘণ্টা ৩০ মিনিটের এক বিশাল সেশন শেষ করেছেন। অভিনন্দন!'
        ]
      }
    ]
  },
  {
    type: 'adhd',
    title: 'ADHD Hyper-focus Protocol (2h)',
    banglaTitle: 'ADHD ২ ঘণ্টার "গভীর ফোকাস" সেশন',
    totalDurationMinutes: 120,
    isAdhd: true,
    description: 'Designed to leverage the ADHD superpower of Hyper-focus. Gamification, high-stimulus deadlines, coffee/refreshments, and high-quality reward breaks included.',
    banglaDescription: 'ADHD ব্রেইনের চমৎকার একটি পরাশক্তি হলো "Hyper-focus"। কোনো বিষয়ে দারুণ আগ্রহ পেলে তারা ঘন্টার পর ঘন্টা করতে পারে। এই সেশনটি সেই শক্তিকে কাজে লাগানোর জন্য।',
    phases: [
      {
        id: 'adhd-hyper-prepare',
        name: 'Gamification (Prepare)',
        banglaName: 'ゲミフィケーション (প্রস্তুতি - ১০ মিনিট)',
        category: 'prepare',
        baseDurationMinutes: 10,
        description: 'Setting gamified challenges with tight deadlines, preparing favorite refreshments.',
        banglaDescription: 'কাজটিকে একটি গেম বা কঠিন চ্যালেঞ্জ হিসেবে নিন এবং ডেস্কে পছন্দের কফি বা শরবত সাজিয়ে বসুন।',
        instructions: [
          { text: 'কাজটিকে একটি গেম বা গেমিফাইড লেভেলের মতো চিন্তা করুন। নিজেকে চ্যালেঞ্জ দিন: "দেখি আমি আগামী ৪৫ মিনিটে কয়টি প্রশ্নের উত্তর বা কোড বাগ শেষ করতে পারি!"', done: false },
          { text: 'আপনার পছন্দের কোনো রিফ্রেশিং পানীয় (কফি বা শরবত বা গ্লুকোজ ওয়াটার) সাথে নিয়ে ডেস্কে বসুন।', done: false }
        ],
        activeTips: [
          'ADHD ব্রেইন চ্যালেঞ্জ বা ডেডলাইন খুব পছন্দ করে। একে একটি রেস হিসেবে সাজান।'
        ]
      },
      {
        id: 'adhd-hyper-work1',
        name: 'Hyper-focus Block (Perform)',
        banglaName: 'হাইপার-ফোকাস ব্লক (পারফর্ম - ৪৫ মিনিট)',
        category: 'perform',
        baseDurationMinutes: 45,
        description: 'First 45-minute high intensity focal block with favorite drink.',
        banglaDescription: 'পছন্দের পানীয় খেতে খেতে টানা ৪৫ মিনিট সর্বোচ্চ একাগ্রতায় কাজ করুন।',
        instructions: [
          { text: 'পানীয় পাশে নিয়ে একটানা কাজে ডুবে যান। ব্রেইনের হাইপার-ফোকাস অন হতে দিন।', done: false },
          { text: 'ডিস্ট্রাকশন আসলেই ডাম্প প্যাডে লিখে ফোকাস ব্রেকিং রোধ করুন।', done: false }
        ],
        activeTips: [
          'হাইপার-ফোকাসে চলে গেলে সময় উবে যাবে, তাই ঘাড় ও পিঠের ভঙ্গি সোজা রাখুন।'
        ]
      },
      {
        id: 'adhd-hyper-break',
        name: 'Reward Break (Perform)',
        banglaName: 'রিওয়ার্ড ব্রেক (১৫ মিনিট)',
        category: 'perform',
        baseDurationMinutes: 15,
        description: 'Earned dopamine reward break, complete ocular and neural relaxation.',
        banglaDescription: 'একটানা ফোকাস করার পর ব্রেইনকে বড় ধরণের রিওয়ার্ড ও শুয়ে থেকে পাওয়ার ন্যাপ দেওয়ার বিরতি।',
        instructions: [
          { text: 'চোখ বন্ধ করে সোজা হয়ে শুয়ে থাকুন বা পাওয়ার ন্যাপ নিন। পছন্দের রিল্যাক্সিং মিউজিক শুনুন বা পছন্দের কোনো এনার্জি ফুড খান।', done: false },
          { text: 'ফোন স্ক্রল করবেন না, এটি আপনার অর্জিত নিউরাল এনার্জি ধূলিসাৎ করে দেবে।', done: false }
        ],
        activeTips: [
          'এই দীর্ঘ ব্রেকটি ডোপামিন লেভেলকে রিসেট করে এবং ব্রেইনের ইনফরমেশন স্টোর করার ক্ষমতা দ্বিগুণ করে।'
        ]
      },
      {
        id: 'adhd-hyper-work2',
        name: 'Final Challenge Block (Perform)',
        banglaName: 'ফাইনাল চ্যালেঞ্জ (পারফর্ম - ৪৫ মিনিট)',
        category: 'perform',
        baseDurationMinutes: 45,
        description: 'Second 45-minute focus challenge setting higher targets.',
        banglaDescription: 'আগের ৪৫ মিনিটের চেয়ে এই ৪৫ মিনিটে আরও বেশি কাজ করার চ্যালেঞ্জ নিন।',
        instructions: [
          { text: 'আগের চেয়ে আরও ১০% স্পিড বাড়িয়ে অসমাপ্ত লক্ষ্যগুলো সম্পন্ন করার রেসে নেমে পড়ুন।', done: false },
          { text: 'ক্লান্তি কাটাতে ১ চুমুক ঠান্ডা পানি পান করুন এবং নিজেকে বলুন— "আই এম উইনিং দিস গেম!"', done: false }
        ],
        activeTips: [
          'আপনার ব্রেইন রিচার্জড। এই ৪৫ মিনিট হবে সেশনের সবচেয়ে প্রোডাক্টিভ অংশ।'
        ]
      },
      {
        id: 'adhd-hyper-preserve',
        name: 'Hard Closing (Preserve)',
        banglaName: 'হার্ড ক্লোজিং ও ডোপামিন রিওয়ার্ড (৫ মিনিট)',
        category: 'preserve',
        baseDurationMinutes: 5,
        description: 'Clearing desktop, ticking finished tasks off with satisfaction, expressing gratitude.',
        banglaDescription: 'কাজগুলো কাগজে কেটে কেটে স্বস্তির আনন্দ নেওয়া এবং সৃষ্টিকর্তার নিকট কৃতজ্ঞতা প্রকাশ করা।',
        instructions: [
          { text: 'টেবিল থেকে সব অপ্রয়োজনীয় বই বা রিসোর্স সরিয়ে ফেলুন।', done: false },
          { text: 'কাজগুলো যে শেষ হয়েছে তা কাগজে কেটে কেটে বড় লাল কালিতে টিক দিয়ে গভীর প্রশান্তি অনুভব করুন।', done: false },
          { text: 'সৃষ্টিকর্তার কাছে শুকরিয়া জানান এবং একটি বড় আরামদায়ক শ্বাস ছাড়ুন।', done: false }
        ],
        activeTips: [
          'অবিশ্বাস্য! আপনি ২ ঘণ্টার একটি ম্যারাথন সেশন শেষ করেছেন। আপনি বিজয়ী!'
        ]
      }
    ]
  }
];

export const GENERAL_PRE_REQUISITES = [
  {
    title: 'ব্লিস স্টেশন সেটআপ (Bliss Station)',
    bangla: 'ব্লিস স্টেশন সেটআপ: কাজের জায়গা থেকে ফোন বা ডিস্ট্রাকশন দূরে রাখুন।',
    icon: 'SmartphoneOff'
  },
  {
    title: 'রিসোর্স কালেকশন (Resources)',
    bangla: 'রিসোর্স কালেকশন: পানির বোতল, কিছু বাদাম/খেজুর এবং কাজের জন্য প্রয়োজনীয় বই বা ফাইল আগেই টেবিলে রাখুন।',
    icon: 'FolderKanban'
  },
  {
    title: 'ক্ল্যারিটি (Clarity & Target)',
    bangla: 'ক্ল্যারিটি: ঠিক কী কাজ শেষ করে উঠবেন, তার এক্সাক্ট টার্গেট ঠিক করুন (যেমন: "আমি ফিজিক্সের ২টা চ্যাপ্টার পড়বো")।',
    icon: 'Target'
  }
];
