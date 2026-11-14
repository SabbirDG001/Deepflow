import { Protocol, Phase } from '../types';

/**
 * Science-backed custom protocol generator.
 * Divides any duration T (minutes) into Prepare, Perform, and Preserve stages.
 * For longer sessions, it inserts appropriate box-breathing or power break intervals.
 */
export function generateCustomProtocol(totalMinutes: number): Protocol {
  // Bound limit to avoid crashes or weird splits (10 min to 300 min)
  const duration = Math.max(10, Math.min(300, totalMinutes));
  
  // 1. Prepare phase: 3 min for T < 60, 5 min for T >= 60
  const prepDuration = duration < 60 ? 3 : 5;
  
  // 2. Preserve phase: 2 min for T < 60, 5 min for T >= 60
  const presDuration = duration < 60 ? 2 : 5;
  
  const performDuration = duration - prepDuration - presDuration;
  
  const phases: Phase[] = [];
  
  // Add Preparation Phase
  phases.push({
    id: `custom-prepare-${duration}`,
    name: 'Activation (Prepare)',
    banglaName: 'অ্যাক্টিভেশন ও প্রিপারেশন',
    category: 'prepare',
    baseDurationMinutes: prepDuration,
    description: 'Calm your posture, lock your focal point, and clear distractions.',
    banglaDescription: 'বডি রিল্যাক্স করুন, ফোন সাইলেন্ট করুন এবং লার্নিং টার্গেট লক করুন।',
    instructions: [
      { text: 'কাজের ডেস্কে সোজা হয়ে বসুন এবং ৪টি গভীর বড় শ্বাস নিন (বক্স ব্রিদিং)।', done: false },
      { text: 'ফোন বা ডিস্ট্রাক্টিং ট্যাব সম্পূর্ণ সরিয়ে চোখের আড়ালে রাখুন।', done: false },
      { text: 'সেশন প্ল্যানার ও এক্সাক্ট লার্নিং বা কোডিং টার্গেট খাতায় লিখে নিন।', done: false }
    ],
    activeTips: [
      'আপনার ব্রেইনকে কাজের ট্র্যাকে আনার জন্য এই ৩/৫ মিনিট খুবই গুরুত্বপূর্ণ।',
      'টার্গেট সুস্পষ্ট থাকলে ফোকাস অর্জনের ডোপামিন ৫ গুণ দ্রুত রিলিজ হয়।'
    ]
  });
  
  // Add Perform Phase(s)
  if (performDuration <= 35) {
    // Single continuous deep focus sprint
    phases.push({
      id: `custom-perform-single-${duration}`,
      name: 'Deep Work Sprint (Perform)',
      banglaName: 'ডিপ ওয়ার্ক সেশন (পারফর্ম)',
      category: 'perform',
      baseDurationMinutes: performDuration,
      description: 'Single continuous focal block. Immerse completely.',
      banglaDescription: 'টানা ১টি সেশন। একমুখী মনোযোগে ডুবে যান।',
      instructions: [
        { text: `টানা ${performDuration} মিনিট কোনো ট্যাব বা মোবাইল টাচ করা সম্পূর্ণ নিষিদ্ধ।`, done: false },
        { text: 'মাথায় অফ-টপিক চিন্তা আসলে Worry Postponement খাতায় লিখে রিলিজ করুন।', done: false },
        { text: 'চক্ষু এবং বডি পজিশন সঠিক রাখুন এবং সর্বোচ্চ একাগ্রতায় কাজ করুন।', done: false }
      ],
      activeTips: [
        'মন উসখুস করতে পারে, তবে প্রথম ৮-১০ মিনিট জোর করে বসা থাকলে ফোকাস ফিরে আসে।',
        'ঠান্ডা জলের ডাইভিং রিফ্লেক্স ব্রেইনকে জাগিয়ে রাখে।'
      ]
    });
  } else {
    // Requires a break!
    // Break duration: 5 minutes if T < 100, else 10 minutes, else 15 minutes for massive sessions
    let breakDuration = 5;
    let breakName = 'Box Breathing Break (Perform)';
    let breakBangla = 'বক্স ব্রিদিং ব্রেক (রিচার্জ)';
    let breakDesc = 'Screen-free visual recovery with standard box breathing.';
    let breakBanglaDesc = '৫ মিনিটের ফোন ও স্ক্রীন ছাড়া একটি বিজ্ঞানসম্মত শিথিলতা ব্রেক।';
    let breakInstructions = [
      { text: 'ডিসপ্লে দেখা নিষিদ্ধ! কাজের চেয়ার ছেড়ে দাঁড়ান এবং ২-৩ ঢোক পানি পান করুন।', done: false },
      { text: 'চোখ বন্ধ করুন এবং আরামদায়ক ভঙ্গিতে ৪-৪-৪-৪ নিয়মে বক্স ব্রিদিং করুন।', done: false },
      { text: 'পরবর্তী সেশনের জন্য ব্রেইনে শান্ত ও সতেজ ডোপামিন হরমোন উৎপন্ন করুন।', done: false }
    ];
    let breakTips = [
      'ব্রেক মানে স্ক্রল নয়। স্ক্রল করলে ব্রেইন ক্লান্ত হয়, মোটিভেশন ড্রপ করে।',
      'চোখের রেস্ট দিয়ে আলফা ব্রেইন ওয়েভ সক্রিয় করুন।'
    ];

    if (duration >= 100 && duration < 135) {
      breakDuration = 10;
      breakName = 'Tactile Rest Block (Perform)';
      breakBangla = '১০ মিনিটের কায়িক বিরতি';
      breakDesc = 'Active movement, room walking or hydrating with zero notifications.';
      breakBanglaDesc = 'ফোন বা ট্যাব স্পর্শ না করে রুমের মধ্যে কিছুক্ষণ পায়চারি করার ধাপ।';
    } else if (duration >= 135) {
      breakDuration = 15;
      breakName = 'Acoustic / Power Nap (Perform)';
      breakBangla = '১৫ মিনিটের পাওয়ার ন্যাপ বিরতি';
      breakDesc = 'Deep rest cycle, progressive muscle relaxation or soft focus shutdown.';
      breakBanglaDesc = 'লম্বা সেশনের পর ব্রেইনের নিউরাল রিকভারির জন্য পাওয়ার ন্যাপ বা চোখ বন্ধ করে রাখা।';
    }
    
    // Split remaining performance blocks
    const remainingPerform = performDuration - breakDuration;
    const work1 = Math.round(remainingPerform * 0.53);
    const work2 = remainingPerform - work1;
    
    // Add 1st work
    phases.push({
      id: `custom-work1-${duration}`,
      name: '1st Heavy Work (Perform)',
      banglaName: '১ম হেভি ডিপ ওয়ার্ক সেশন',
      category: 'perform',
      baseDurationMinutes: work1,
      description: 'First block of deep focus when motivation is high.',
      banglaDescription: 'সবচেয়ে কঠিন কাজটি দিয়ে শুরু করুন এবং একটানা মনোযোগ দিন।',
      instructions: [
        { text: `টানা ${work1} মিনিট কোনো রকমের সামাজিক মাধ্যম ওপেন করবেন না।`, done: false },
        { text: 'কঠিন লজিক বা রিডিং টাস্কগুলো এই সেশনেই আগে শেষ করার চেষ্টা করুন।', done: false }
      ],
      activeTips: [
        'মনোযোগের চূড়ান্ত চূড়ায় উঠতে ৪-৫ মিনিট সময় লাগে, জোরপূর্বক শুরু করলেই কেবল স্পিড বাড়ে।',
        'অন্য কোনো দুশ্চিন্তা মনকে বিভ্রান্ত করলে পেনডেন্ট ওয়ারি বক্সে লিখুন।'
      ]
    });
    
    // Add active Break
    phases.push({
      id: `custom-break-${duration}`,
      name: breakName,
      banglaName: breakBangla,
      category: 'perform',
      baseDurationMinutes: breakDuration,
      description: breakDesc,
      banglaDescription: breakBanglaDesc,
      instructions: breakInstructions,
      activeTips: breakTips
    });
    
    // Add 2nd work
    phases.push({
      id: `custom-work2-${duration}`,
      name: '2nd Work Sprint (Perform)',
      banglaName: '২য় ডিপ ওয়ার্ক ও ফোকাল স্প্রিন্ট',
      category: 'perform',
      baseDurationMinutes: work2,
      description: 'Final focal stretch after dynamic neural recharge.',
      banglaDescription: 'বিরতির পর নতুন উদ্যমে কাজ শেষ করার স্প্রিন্ট সেশন।',
      instructions: [
        { text: `আর মাত্র ${work2} মিনিট, সব শক্তি দিয়ে অসমাপ্ত লক্ষ্য সম্পূর্ণ করে তুলুন।`, done: false },
        { text: 'মন চাঙ্গা রাখতে সিটে পিঠ সোজা করে বসুন এবং একটু পানি মুখে দিন।', done: false }
      ],
      activeTips: [
        'এই সেশনে ব্রেইন ইতিমধ্যে বিরতির মাধ্যমে রিচার্জড। দ্রুত কাজ এগোবে!',
        'নোটিফিকেশন এর কোনো অবিলম্ব প্রলোভনকে পাত্তা দেবেন না।'
      ]
    });
  }
  
  // Add Closing/Preserve Phase
  phases.push({
    id: `custom-preserve-${duration}`,
    name: 'Closing (Preserve)',
    banglaName: 'ক্লোজিং ও প্রিজারভেশন সেশন',
    category: 'preserve',
    baseDurationMinutes: presDuration,
    description: 'Acknowledge success, tidy up physical and digital spaces, log session metrics.',
    banglaDescription: 'বই বা ল্যাপটপ গুছিয়ে টেবিল পরিষ্কার করার মাধ্যমে ব্রেইনকে সেশনের সাফল্য রিলিজ দিন।',
    instructions: [
      { text: 'সফলভাবে টার্গেট অর্জনের জন্য সৃষ্টিকর্তার নিকট কৃতজ্ঞতা প্রকাশ করুন।', done: false },
      { text: 'ডেস্কের চারপাশে ছড়িয়ে থাকা খাতা বা পানির বোতল নতুনের মতো সাজিয়ে রাখুন।', done: false },
      { text: 'সেশন ট্র্যাকিং প্যানেলে ফোকাস ও এনার্জির রেটিং দিয়ে ডেটা সংরক্ষণ করুন।', done: false }
    ],
    activeTips: [
      'টেবিল গুছিয়ে প্রস্থান করা আগামীকালের শুরুকে ৩০০% মসৃণ ও আকর্ষণীয় করে তোলে।',
      'তৃপ্তিকর শান্তির নিঃশ্বাস (Physiological Sigh of Relief) নিয়ে সেশনটি আনুষ্ঠানিকভাবে সমাপ্ত করুন।'
    ]
  });
  
  return {
    type: 'custom',
    title: `Custom ${duration}m Session`,
    banglaTitle: `কাস্টম ${duration} মিনিটের বৈজ্ঞানিক সেশন`,
    totalDurationMinutes: duration,
    description: `A dynamically calibrated science-backed deep work protocol spanning exactly ${duration} minutes.`,
    banglaDescription: `আপনার শিডিউল অনুযায়ী তৈরি ${duration} মিনিটের একটি কাস্টম গভীর ফোকাস সেশন।`,
    phases
  };
}
