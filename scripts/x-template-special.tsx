import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Sparkles, 
  Compass, 
  Search, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Calendar, 
  Clock, 
  Award, 
  MapPin, 
  CheckCircle2, 
  Star, 
  Phone, 
  User, 
  Activity,
  Workflow,
  CornerDownRight,
  Lock,
  Sliders,
  Layers,
  Layout,
  Maximize2,
  ChevronLeft,
  Mail,
  Check
} from 'lucide-react';

// อินเตอร์เฟซข้อมูลอสังหาริมทรัพย์ระดับซูเปอร์ลักชัวรี
interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  numericPrice: number; // ล้านบาท
  category: 'Penthouse' | 'Mansion' | 'Private Island';
  image: string;
  details: {
    area: string;
    beds: number;
    baths: number;
    perfectionScore: number; // 98-100%
  };
  highlights: string[];
  specs: {
    privacy: number; // %
    aesthetic: number; // %
    security: number; // %
  };
  blueprintAreas: {
    name: string;
    description: string;
    status: string;
  }[];
}

const propertiesData: Property[] = [
  {
    id: 'prop-1',
    title: 'The Overlord Sky-Penthouse',
    location: 'Sukhumvit Peak, Bangkok',
    price: '380,000,000 ฿',
    numericPrice: 380,
    category: 'Penthouse',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
    details: { area: '1,250 ตร.ม.', beds: 5, baths: 6, perfectionScore: 99.9 },
    highlights: ['สระว่ายน้ำกระจกนิรภัยลอยฟ้าบนชั้น 88', 'ลิฟต์ส่วนตัวสแกนลายนิ้วมือและม่านตา', 'ระบบควบคุมสภาพอากาศและออกซิเจนบริสุทธิ์'],
    specs: { privacy: 100, aesthetic: 99, security: 100 },
    blueprintAreas: [
      { name: 'Sky Observatory', description: 'กระจกโค้ง 180 องศานำเข้าจากเบลเยียม รับแสงธรรมชาติไร้เงาสะท้อน', status: 'Perfected' },
      { name: 'Oxygen Chamber Bed', description: 'ห้องนอนควบคุมแรงดันอากาศและเติมความสดชื่นอัจฉริยะ', status: 'Perfected' },
      { name: 'Infinity Glass Pool', description: 'โครงสร้างกระจกอะคริลิกหนา 5 ชั้น แข็งแกร่งทนทานต่อแรงกดดัน', status: 'Perfected' }
    ]
  },
  {
    id: 'prop-2',
    title: 'Aura Obsidian Megamansion',
    location: 'Lakeside Sanctuary, Eastern Outer Ring',
    price: '720,000,000 ฿',
    numericPrice: 720,
    category: 'Mansion',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    details: { area: '3,400 ตร.ม.', beds: 8, baths: 10, perfectionScore: 100 },
    highlights: ['โรงจอดรถซูเปอร์คาร์ใต้ดินระบบไฮดรอลิก 12 คัน', 'ผนังกระจกกันกระสุนแบบโค้ง 360 องศา', 'ห้องนิรภัยมาตรฐานสูงสุดระดับสากล (Panic Room)'],
    specs: { privacy: 98, aesthetic: 100, security: 100 },
    blueprintAreas: [
      { name: 'Hydraulic Garage', description: 'ลิฟต์ยกซูเปอร์คาร์ใต้ดิน เงียบสนิท ไร้การสั่นสะเทือนสู่ตัวบ้าน', status: 'Perfected' },
      { name: 'Lakeside Pavilion', description: 'ระเบียงหินอ่อนยื่นลงน้ำเพื่อรับกระแสลมเย็นธรรมชาติ', status: 'Perfected' },
      { name: 'Fortified Core Vault', description: 'ห้องนิรภัยอิสระพร้อมระบบสื่อสารดาวเทียมสำรองส่วนตัว', status: 'Perfected' }
    ]
  },
  {
    id: 'prop-3',
    title: 'The Siren Sanctuary Isle',
    location: 'Phuket Deep Blue Archipelago',
    price: '1,450,000,000 ฿',
    numericPrice: 1450,
    category: 'Private Island',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    details: { area: '24 ไร่', beds: 12, baths: 15, perfectionScore: 99.8 },
    highlights: ['ลานจอดเฮลิคอปเตอร์คู่ขนานท่ามกลางวิวทะเล', 'หาดทรายขาวส่วนตัวที่คัดกรองตะกอนพิเศษ', 'ท่าเทียบเรือยอทช์ระดับซูเปอร์เมกะยอทช์'],
    specs: { privacy: 100, aesthetic: 98, security: 99 },
    blueprintAreas: [
      { name: 'Dual Helipads', description: 'รันเวย์ลงจอดมาตรฐานการบินพลเรือน รองรับเฮลิคอปเตอร์ขนาดใหญ่', status: 'Perfected' },
      { name: 'Yacht Anchorage', description: 'ท่าเทียบเรือน้ำลึกพร้อมระบบวิเคราะห์คลื่นลมแบบรีลไทม์', status: 'Perfected' },
      { name: 'Filtration Beach', description: 'ชายหาดจำลองที่คัดสรรทรายแก้วคริสตัลละเอียด ไม่ติดผิวสัมผัส', status: 'Perfected' }
    ]
  },
  {
    id: 'prop-4',
    title: 'Celestial Glass Dome Villa',
    location: 'Chao Phraya Riverfront Frontline',
    price: '490,000,000 ฿',
    numericPrice: 490,
    category: 'Mansion',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
    details: { area: '1,800 ตร.ม.', beds: 6, baths: 8, perfectionScore: 99.7 },
    highlights: ['โดมกระจกไร้ขอบพับเปิดรับลมธรรมชาติได้ทั้งหลัง', 'สวนป่าฝนลอยฟ้าในร่มควบคุมอุณหภูมิ', 'ท่าน้ำส่วนตัวพร้อมระเบียงชมวิวโค้งน้ำที่สวยที่สุด'],
    specs: { privacy: 95, aesthetic: 100, security: 98 },
    blueprintAreas: [
      { name: 'Retractable Dome', description: 'โดมกระจกเปิด-ปิดใน 45 วินาที ไร้เสียงรบกวนด้วยมอเตอร์แม่เหล็ก', status: 'Perfected' },
      { name: 'Riverfront Terrace', description: 'พื้นยื่นสถาปัตยกรรมไร้เสาต้านทานแรงน้ำเชี่ยวได้อย่างมั่นคง', status: 'Perfected' },
      { name: 'Microclimate Garden', description: 'สวนในร่มจำลองสภาพแวดล้อมป่าสน ควบคุมความชื้นด้วย AI', status: 'Perfected' }
    ]
  }
];

export default function App() {
  // สเตตฟิลเตอร์และการนำทางหลัก
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Penthouse' | 'Mansion' | 'Private Island'>('All');
  const [priceRange, setPriceRange] = useState<number>(1500); 
  const [selectedProperty, setSelectedProperty] = useState<Property>(propertiesData[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // ระบบทัวร์เสมือนจริง (Virtual Interactive Console)
  const [tourMode, setTourMode] = useState<'Real' | 'Structural' | 'Aero-View'>('Real');
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [scanProgress, setScanProgress] = useState<number>(0);

  // สเตตระบบ Blueprint Interactive Map
  const [selectedAreaIndex, setSelectedAreaIndex] = useState<number>(0);

  // สเตตจองนัดหมายพรีเมียมแบบ Step-by-Step
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  // ระบบการแจ้งเตือนพาสเทลลอยตัว
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress((prev) => (prev >= 100 ? 0 : prev + 0.8));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const triggerNotification = (message: string) => {
    setActiveNotification(message);
    setTimeout(() => setActiveNotification(null), 3500);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !selectedDate || !selectedTime) {
      triggerNotification('กรุณากรอกข้อมูลสำคัญให้ครบถ้วนก่อนยืนยันสิทธิ์');
      return;
    }
    setBookingConfirmed(true);
    triggerNotification('จองสิทธิ์ปรึกษาส่วนตัวสำเร็จ ระบบได้บันทึกคิวคุณแล้ว');
  };

  const filteredProperties = propertiesData.filter((item) => {
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchPrice = item.numericPrice <= priceRange;
    const matchText = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchPrice && matchText;
  });

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-700 font-sans selection:bg-sky-200 selection:text-sky-900 overflow-x-hidden pb-12">
      
      {/* วอลเปเปอร์ออร่าพาสเทลนุ่มนวล (Soft Pastel Ambient Light) */}
      <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-sky-100/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[800px] left-10 w-[800px] h-[800px] bg-indigo-50/60 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-sky-100/30 rounded-full blur-[150px] pointer-events-none" />

      {/* แจ้งเตือนสไตล์พาสเทลพรีเมียม */}
      {activeNotification && (
        <div className="fixed top-6 right-6 z-50 animate-bounce">
          <div className="bg-white/90 border border-sky-100/80 text-sky-900 px-6 py-4 rounded-2xl shadow-[0_15px_40px_rgba(14,165,233,0.08)] flex items-center gap-3 backdrop-blur-xl">
            <Sparkles className="text-sky-500 w-5 h-5 animate-pulse" />
            <div>
              <p className="font-bold text-xs uppercase tracking-wider text-sky-700">Aura Notification</p>
              <p className="text-xs text-slate-600 font-semibold">{activeNotification}</p>
            </div>
          </div>
        </div>
      )}

      {/* แถบนำทางโปร่งแสงขาวประกาย (Prism Ivory Navbar) */}
      <nav className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-sky-100/50 px-6 py-4 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* โลโก้แบรนด์พาสเทลหรู */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-300 via-indigo-200 to-sky-400 p-[1.5px] shadow-[0_4px_15px_rgba(125,211,252,0.3)]">
              <div className="w-full h-full bg-white rounded-[9px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-sky-500 group-hover:rotate-90 transition-transform duration-700" />
              </div>
            </div>
            <div>
              <span className="text-lg font-black tracking-wider bg-gradient-to-r from-sky-600 via-indigo-500 to-sky-700 bg-clip-text text-transparent">VARISARA</span>
              <span className="block text-[8px] uppercase tracking-[0.3em] text-sky-400/80 font-extrabold">AURA LUXE ATELIER</span>
            </div>
          </div>

          {/* สเตตัสแถบควบคุมการตรวจงาน */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-semibold">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50/50 border border-sky-100">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
              <span className="text-sky-800">Perfect Control: ตรวจเช็กงานด้วยตนเอง 100%</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <Award className="text-sky-500 w-4 h-4" />
              <span>การันตีผลงานสะสมสูงสุดของกลุ่มบิลเลียนแนร์</span>
            </div>
          </div>

          <a 
            href="#atelier-booking"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_15px_rgba(14,165,233,0.15)] hover:shadow-[0_4px_25px_rgba(14,165,233,0.3)] transition-all duration-300"
          >
            สำรองคิวแบบส่วนตัว
          </a>
        </div>
      </nav>

      {/* Hero ดีไซน์ใหม่: Asymmetrical Editorial Layout */}
      <header className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-12 gap-12 items-center">
        
        {/* คอลัมน์ซ้าย: ข้อความและแนวคิดสุนทรียภาพแบบนิตยสารแฟชั่นหรู */}
        <div className="lg:col-span-6 space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-100 text-sky-600 text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            PURE PERFECTIONIST AESTHETIC
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] text-slate-900">
            วิจิตรศิลป์แห่ง <br />
            <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-600 bg-clip-text text-transparent">
              การอยู่อาศัยที่ไร้รอยต่อ
            </span>
          </h1>

          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-xl">
            บทนิยามใหม่ของการซื้อขายอสังหาฯ ระดับพรีเมียม คัดสรร คัดกรอง และส่งมอบคฤหาสน์โดย <strong className="text-sky-600 font-bold">คุณวริศรา เสนีย์พิทักษ์</strong> เพื่อให้ทุกตารางนิ้วของสิ่งปลูกสร้างสอดรับกับวิถีชีวิตระดับอัครมหาเศรษฐีอย่างแท้จริง
          </p>

          {/* ปรัชญาสไตล์ Editorial พร้อมลายเซ็นจำลอง */}
          <div className="p-6 bg-white rounded-2xl border border-sky-100/80 shadow-[0_8px_30px_rgba(14,165,233,0.02)] space-y-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-sky-300" />
            <p className="italic text-slate-600 text-xs md:text-sm leading-relaxed">
              "ความสมบูรณ์แบบไม่ต้องการเสียงอธิบายที่ดังเกินไป แต่บอกเล่าผ่านรอยต่อของแผ่นหินอ่อนอิตาลีที่เชื่อมต่อกันอย่างไม่มีสะดุด และแสงแดดยามเช้าที่หักเหทำมุมอย่างเหมาะสมที่สุด"
            </p>
            <div className="flex justify-between items-center pt-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-sky-500">— วริศรา เสนีย์พิทักษ์ (Founder)</span>
              <span className="font-serif text-sm italic text-slate-300 select-none">Varisara.S</span>
            </div>
          </div>
        </div>

        {/* คอลัมน์ขวา: พอร์ตโฟลิโอและแผงจำลองการวิเคราะห์ใบหน้าคุณวริศราและบ้าน */}
        <div className="lg:col-span-6 relative flex justify-center">
          <div className="relative group w-full max-w-[420px]">
            {/* แสงออร่าพาสเทลด้านหลังแผงเจ้าของ */}
            <div className="absolute -inset-4 bg-gradient-to-r from-sky-200 to-indigo-100 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-70 transition duration-700" />

            <div className="relative bg-white border border-sky-100 p-4 rounded-[2.5rem] shadow-xl">
              
              {/* ภาพคุณวริศรา ในธีมสว่างเรียบหรู */}
              <div className="relative h-[380px] rounded-[1.8rem] overflow-hidden bg-slate-100">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" 
                  alt="คุณวริศรา ตัวแทนระดับเพอร์เฟกต์" 
                  className="w-full h-full object-cover object-top filter contrast-105 transition-transform duration-700 group-hover:scale-105"
                />

                {/* แสงเลเซอร์สแกนแนวระนาบสีฟ้าอัจฉริยะ */}
                <div 
                  className="absolute left-0 w-full h-[2px] bg-sky-400 shadow-[0_0_15px_rgba(56,189,248,1)] z-20"
                  style={{ top: `${scanProgress}%`, transition: 'top 0.05s linear' }}
                />

                {/* โอเวอร์เลย์ตรวจสอบโครงสร้างใบหน้า/มุมบ้านจำลอง */}
                <div className="absolute inset-0 bg-sky-950/10 mix-blend-color-burn" />

                {/* บันทึกสถิติมุมมองระดับสากล */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl border border-sky-100/50 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
                    <span className="text-[9px] text-sky-800 font-extrabold tracking-widest">AESTHETIC ANALYSIS</span>
                  </div>
                  <span className="text-[9px] text-slate-500 font-bold">100% EXQUISITE</span>
                </div>

                {/* รายละเอียดบทบาทมุมล่าง */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/70 to-transparent p-6 pt-16">
                  <p className="text-[10px] uppercase tracking-widest text-sky-600 font-extrabold">CHIEF INTERIOR & REAL ESTATE CURATOR</p>
                  <h3 className="text-xl font-black text-slate-900 mt-1">วริศรา เสนีย์พิทักษ์</h3>
                </div>
              </div>

              {/* วิจัยสัดส่วนแบบพาสเทล 3 ช่อง */}
              <div className="grid grid-cols-3 gap-2.5 mt-4">
                <div className="p-3 bg-sky-50/50 border border-sky-100/50 rounded-xl text-center">
                  <span className="block text-sm font-black text-sky-600">99.9%</span>
                  <span className="text-[8px] text-slate-400 font-extrabold uppercase">Aesthetic Rating</span>
                </div>
                <div className="p-3 bg-indigo-50/40 border border-indigo-100/50 rounded-xl text-center">
                  <span className="block text-sm font-black text-indigo-600">100%</span>
                  <span className="text-[8px] text-slate-400 font-extrabold uppercase">Material Check</span>
                </div>
                <div className="p-3 bg-sky-50/50 border border-sky-100/50 rounded-xl text-center">
                  <span className="block text-sm font-black text-sky-600">24/7</span>
                  <span className="text-[8px] text-slate-400 font-extrabold uppercase">Concierge Care</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* โครงสร้างใหม่ที่แตกต่าง: "Master Control Showcase" (โรงละครอสังหาฯ และทัวร์อัจฉริยะ) */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center space-y-4 mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-500">Interactive Master Control</p>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900">แผงควบคุมและโรงละครอสังหาริมทรัพย์</h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            เลือกจิ้มอสังหาริมทรัพย์จากแถบรายการเพื่อสลับเนื้อหาและการวิเคราะห์เชิงโครงสร้างได้อย่างรวดเร็วในหน้าต่างหลัก
          </p>
        </div>

        {/* ตารางควบคุมหลักขนาดใหญ่ (The Theater Terminal Layout) */}
        <div className="grid lg:grid-cols-12 gap-8 bg-white border border-sky-100 p-6 md:p-8 rounded-[3rem] shadow-[0_15px_50px_rgba(14,165,233,0.03)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100/10 rounded-full blur-3xl pointer-events-none" />

          {/* ฝั่งซ้าย (4 คอลัมน์): รายการทางเลือกอสังหาฯ และตัวกรองประเภทด่วน */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">คัดกรองสไตล์การใช้ชีวิต</h3>
              <div className="flex gap-1.5 overflow-x-auto pb-2">
                {(['All', 'Penthouse', 'Mansion', 'Private Island'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      triggerNotification(`กรองประเภทห้องเป็น: ${cat}`);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                      selectedCategory === cat 
                        ? 'bg-sky-500 text-white shadow-sm' 
                        : 'bg-slate-50 hover:bg-sky-50/50 text-slate-500 border border-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* รายการอสังหาฯ แบบแนวตั้งเพื่อจิ้มสลับเนื้อหา (Vertical Selection Stack) */}
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {filteredProperties.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => {
                    setSelectedProperty(p);
                    triggerNotification(`เปลี่ยนอสังหาฯ แผงควบคุมหลักเป็น: ${p.title}`);
                  }}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-4 items-center ${
                    selectedProperty.id === p.id 
                      ? 'bg-sky-50/70 border-sky-300 shadow-sm' 
                      : 'bg-white border-slate-100 hover:border-sky-100 hover:bg-slate-50/40'
                  }`}
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <p className="text-[9px] uppercase tracking-widest font-black text-sky-500">{p.category}</p>
                    <h4 className="text-xs font-bold text-slate-800 truncate">{p.title}</h4>
                    <p className="text-[10px] text-slate-400 truncate flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-sky-400" />
                      {p.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ค้นหาด่วนด้วยคำคำสำคัญ */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="พิมพ์ค้นหาคฤหาสน์หรู..." 
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-9 pr-4 text-xs font-semibold focus:outline-none focus:border-sky-300 transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* ฝั่งขวา (8 คอลัมน์): โรงละครวิดีโอและตัววัดผลเชิงลึกของชิ้นงานที่เลือก */}
          <div className="lg:col-span-8 space-y-6 border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0 lg:pl-8">
            
            {/* แถบข้อมูลชื่อคฤหาสน์และตัวควบคุมกล้อง Virtual Drone */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-500">Live Architecture Broadcast</span>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-0.5">{selectedProperty.title}</h3>
                <p className="text-xs text-slate-400 font-medium">{selectedProperty.location}</p>
              </div>

              {/* ปุ่มเปลี่ยนฟิลเตอร์กล้องทัวร์จำลอง */}
              <div className="flex bg-slate-100 p-1 rounded-xl self-start sm:self-auto border border-slate-200/50">
                {(['Real', 'Structural', 'Aero-View'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setTourMode(mode);
                      triggerNotification(`เปลี่ยนโหมดกล้องจำลองภาพ: ${mode}`);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all ${
                      tourMode === mode 
                        ? 'bg-sky-500 text-white shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* หน้าต่างแสดงวิดีโอ/ภาพถ่ายแบบ Interactive Cinema Screen */}
            <div className="relative rounded-[2rem] overflow-hidden bg-slate-900 aspect-[16/9] shadow-md border border-slate-100">
              
              {/* เอฟเฟกต์ประมวลผลซ้อนทับภาพ (Video Filter Effects) */}
              <div className="absolute inset-0 z-10 pointer-events-none transition-all duration-500">
                {tourMode === 'Structural' && (
                  <div className="w-full h-full bg-sky-400/10 mix-blend-color-dodge backdrop-brightness-110" />
                )}
                {tourMode === 'Aero-View' && (
                  <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(56,189,248,0.05),_rgba(255,255,255,0.02))] bg-[length:100%_4px,_6px_100%] opacity-90" />
                )}
              </div>

              {/* รูปภาพจำลองวิดีโอ */}
              <img 
                src={selectedProperty.image} 
                alt={selectedProperty.title} 
                className={`w-full h-full object-cover transition-all duration-700 ${
                  tourMode === 'Structural' ? 'filter grayscale contrast-200 brightness-90' : ''
                } ${
                  tourMode === 'Aero-View' ? 'filter sepia-0 saturate-150 brightness-110 hue-rotate-15' : ''
                } ${isVideoPlaying ? 'scale-105 duration-1000' : 'scale-100'}`}
              />

              {/* อินเตอร์เฟซซ้อนทับกล้องเสมือน (Camera Overlay UI) */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 z-15 text-white pointer-events-none font-mono text-[9px]">
                <div className="flex justify-between items-start">
                  <div className="space-y-1 bg-slate-900/60 p-2.5 rounded-lg backdrop-blur-md">
                    <p>CAMERA: AURA_0{selectedProperty.id.split('-')[1]}</p>
                    <p>AZIMUTH: 184.3° | TILT: -12.4°</p>
                    <p>SCAN_MODE: {tourMode.toUpperCase()}</p>
                  </div>
                  <div className="text-right bg-slate-900/60 p-2.5 rounded-lg backdrop-blur-md">
                    <p className="text-sky-300 animate-pulse">● FEED STABLE</p>
                    <p>LATENCY: 14ms</p>
                  </div>
                </div>

                {/* ข้อความวิเคราะห์พฤติกรรมโครงสร้าง */}
                <div className="flex justify-between items-end bg-slate-900/70 p-3 rounded-xl backdrop-blur-md pointer-events-auto">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        setIsVideoPlaying(!isVideoPlaying);
                        triggerNotification(isVideoPlaying ? 'หยุดการเคลื่อนไหวสำรวจ' : 'กำลังเริ่มการสำรวจรอบทิศทาง');
                      }}
                      className="p-2 rounded-full bg-sky-500 hover:bg-sky-600 text-white transition-colors"
                    >
                      {isVideoPlaying ? <Pause className="w-3 h-3 fill-white" /> : <Play className="w-3 h-3 fill-white" />}
                    </button>
                    <span className="text-[10px] font-bold">มุมมองรอบคฤหาสน์ 3 มิติ</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((bar) => (
                        <div 
                          key={bar} 
                          className="w-[2px] bg-sky-400 transition-all duration-300"
                          style={{
                            height: isVideoPlaying && !isMuted ? `${bar * 3}px` : '3px',
                            animation: isVideoPlaying && !isMuted ? `bounce 0.6s ease-in-out infinite alternate ${bar * 0.12}s` : 'none'
                          }}
                        />
                      ))}
                    </div>
                    <button 
                      onClick={() => {
                        setIsMuted(!isMuted);
                        triggerNotification(isMuted ? 'เปิดเสียงบรรยากาศคลื่นลมธรรมชาติ' : 'ปิดเสียงระบบทัวร์');
                      }}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* เรดาร์วัดเกณฑ์ความสมบูรณ์แบบของบ้านตัวอย่าง (High Contrast Specs Gauges) */}
            <div className="grid md:grid-cols-3 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-bold">Absolute Privacy</span>
                  <span className="text-sky-600 font-black">{selectedProperty.specs.privacy}%</span>
                </div>
                <div className="h-1.5 bg-slate-200/60 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-sky-400 to-sky-600 transition-all duration-1000"
                    style={{ width: `${selectedProperty.specs.privacy}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-bold">Aesthetic Design</span>
                  <span className="text-indigo-600 font-black">{selectedProperty.specs.aesthetic}%</span>
                </div>
                <div className="h-1.5 bg-slate-200/60 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 transition-all duration-1000"
                    style={{ width: `${selectedProperty.specs.aesthetic}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-bold">Aura Security</span>
                  <span className="text-emerald-600 font-black">{selectedProperty.specs.security}%</span>
                </div>
                <div className="h-1.5 bg-slate-200/60 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-1000"
                    style={{ width: `${selectedProperty.specs.security}%` }}
                  />
                </div>
              </div>
            </div>

            {/* รายละเอียดราคาพิเศษและปุ่มจองสิทธิ์ด่วน */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pt-4 border-t border-slate-100">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">ราคาครอบครองแบบเบ็ดเสร็จ</span>
                <span className="block text-2xl font-black text-sky-600">{selectedProperty.price}</span>
              </div>
              <a 
                href="#atelier-booking"
                className="px-6 py-3 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-bold transition-all border border-sky-100 flex items-center gap-2 justify-center"
              >
                <Calendar className="w-4 h-4" />
                จองคิวรับแชมเปญต้อนรับเข้าชมสถานที่จริง
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* บอร์ดสแกนงานระบบสถาปัตยกรรมแบบจำลองโครงสร้าง Blueprint (Interactive Blueprint Map) */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-24 border-y border-sky-100/40 relative">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          
          {/* คอลัมน์ซ้าย (5 คอลัมน์): รายละเอียดการสแกนงานแบบสมบูรณ์แบบ */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-[10px] font-bold uppercase tracking-widest border border-sky-100">
              <Layers className="w-3.5 h-3.5" />
              Structural Precision
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">ตรวจสอบแผนผัง <br />และสเปกวัสดุอัจฉริยะ</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              วริศรายึดมั่นในรายละเอียดโครงสร้างที่ตรวจสอบผ่านสิบแปดวิศวกรผู้เชี่ยวชาญ ลองแตะแต่ละจุดในพิมพ์เขียวจำลองทางขวาเพื่อสแกนดูผลวิเคราะห์วัสดุ
            </p>

            {/* รายละเอียดแผงลอยแสดงจุดเด่นสแกนผ่านเกณฑ์ที่เลือก */}
            <div className="p-6 bg-white rounded-2xl border border-sky-100 shadow-sm space-y-3">
              <span className="text-[9px] font-black uppercase tracking-widest text-sky-500 flex items-center gap-1.5">
                <Workflow className="w-4 h-4 text-sky-400 animate-spin" />
                ACTIVE SCANNER ANALYSIS
              </span>
              <h4 className="text-sm font-bold text-slate-800">
                {selectedProperty.blueprintAreas[selectedAreaIndex]?.name}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {selectedProperty.blueprintAreas[selectedAreaIndex]?.description}
              </p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 text-[9px] font-bold uppercase tracking-wider">
                <Check className="w-3 h-3 stroke-[3px]" />
                {selectedProperty.blueprintAreas[selectedAreaIndex]?.status}
              </div>
            </div>
          </div>

          {/* คอลัมน์ขวา (7 คอลัมน์): บลูพริ้นต์จำลองแบบคลิกเลือกเพื่อดูความเพอร์เฟกต์ */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-sky-100 shadow-md relative overflow-hidden">
            {/* กราฟิกตารางพิกัดจำลองพิมพ์เขียวสถาปัตยกรรม (Blueprint Matrix) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(14,165,233,0.03)_1px,_transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-6">
              <Layout className="w-4 h-4 text-sky-500" />
              แผนผังสุนทรียศาสตร์และการใช้สอย (Dynamic Blueprint)
            </h3>

            {/* แผงควบคุมพิมพ์เขียวแบบมีมิติ */}
            <div className="relative border-2 border-sky-200 border-dashed rounded-2xl p-6 bg-sky-50/20 aspect-[4/3] flex flex-col justify-between">
              
              {/* รายการปุ่มจำลองแต่ละห้องให้กด */}
              <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2">
                <button 
                  onClick={() => {
                    setSelectedAreaIndex(0);
                    triggerNotification('ตรวจสอบงานระบบ Sky Observatory');
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all relative ${
                    selectedAreaIndex === 0 
                      ? 'bg-sky-500 text-white scale-110 shadow-lg shadow-sky-500/20' 
                      : 'bg-white text-sky-600 border border-sky-100 hover:bg-sky-50'
                  }`}
                >
                  01
                  <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[9px] font-black text-slate-500">Zone 1</span>
                </button>
              </div>

              <div className="absolute top-1/2 right-1/4 transform translate-x-1/2">
                <button 
                  onClick={() => {
                    setSelectedAreaIndex(1);
                    triggerNotification('ตรวจสอบงานระบบ Oxygen Bed');
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all relative ${
                    selectedAreaIndex === 1 
                      ? 'bg-sky-500 text-white scale-110 shadow-lg shadow-sky-500/20' 
                      : 'bg-white text-sky-600 border border-sky-100 hover:bg-sky-50'
                  }`}
                >
                  02
                  <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[9px] font-black text-slate-500">Zone 2</span>
                </button>
              </div>

              <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2">
                <button 
                  onClick={() => {
                    setSelectedAreaIndex(2);
                    triggerNotification('ตรวจสอบงานระบบ Glass Pool');
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all relative ${
                    selectedAreaIndex === 2 
                      ? 'bg-sky-500 text-white scale-110 shadow-lg shadow-sky-500/20' 
                      : 'bg-white text-sky-600 border border-sky-100 hover:bg-sky-50'
                  }`}
                >
                  03
                  <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[9px] font-black text-slate-500">Zone 3</span>
                </button>
              </div>

              <div className="flex justify-between text-[10px] text-sky-500 font-mono">
                <span>[GRID_SCALE: 1:150]</span>
                <span>[AURA_PERFECTION_VERIFIED]</span>
              </div>

              <div className="flex justify-between items-end text-[10px] text-sky-500 font-mono">
                <span>[COORDINATE: 44A // B9]</span>
                <span>[TAP ANY NUMBER TO SCAN]</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* แกลเลอรี่ความงดงามสไตล์นิตยสาร (Premium Light Gallery Showroom) */}
      <section className="bg-white py-24 border-b border-sky-100/40">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          <div className="text-center space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-500">Curated Architecture Details</p>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900">ทุกแง่มุมผ่านการขัดเกลาทางสายตา</h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">
              วัสดุ ทัศนวิสัย และการจัดวางโครงสร้างแบบไร้ที่ติ คัดสรรจากทั่วทุกมุมโลกเพื่อให้คู่ควรต่อความยิ่งใหญ่ของชีวิตคุณ
            </p>
          </div>

          {/* รายการภาพถ่าย 4 สไตล์การตกแต่ง */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'รอยต่อหินอ่อนที่ไร้ตะเข็บ', img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=600' },
              { label: 'มุมแสงสว่างแบบสเปซเงียบ', img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=600' },
              { label: 'บันไดลอยสไตล์ประติมากรรม', img: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=600' },
              { label: 'ขอบสระว่ายน้ำกระจกไร้เสา', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600' }
            ].map((item, index) => (
              <div key={index} className="group relative h-80 rounded-2xl overflow-hidden border border-slate-100 cursor-pointer shadow-sm">
                <img src={item.img} alt={item.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[9px] uppercase tracking-widest text-sky-300 font-extrabold">AESTHETIC_0{index + 1}</span>
                  <h4 className="text-xs font-bold text-white mt-1">{item.label}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* แบบฟอร์มลงทะเบียนระดับเอ็กซ์คลูซีฟแบบ Step-by-Step (Atelier Reservation Hub) */}
      <section id="atelier-booking" className="max-w-4xl mx-auto px-6 py-24">
        <div className="bg-white rounded-[2.5rem] border border-sky-200/60 p-8 md:p-12 shadow-[0_20px_50px_rgba(14,165,233,0.04)] relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-100/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-100/10 rounded-full blur-3xl pointer-events-none" />

          {/* หัวข้อจองพรีเมียม */}
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-600 text-[10px] font-bold uppercase tracking-widest">
              <Shield className="w-3.5 h-3.5" />
              EXPRESSIVE RESERVATION PROMPT
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">สำรองสิทธิ์การบริการระดับอัครมหาเศรษฐี</h2>
            <p className="text-slate-500 text-xs md:text-sm max-w-lg mx-auto">
              คุณวริศราและบัตเลอร์ประสานงานส่วนตัวพร้อมจัดเตรียมแชมเปญชั้นเลิศและรถรับ-ส่งเพื่อต้อนรับท่านอย่างสมเกียรติ
            </p>
          </div>

          {/* แสดงสถานะสเตปการกรอกข้อมูล (Progress Step Indicator) */}
          <div className="flex items-center justify-center gap-6 mb-8 text-xs font-bold text-slate-400">
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${bookingStep >= 1 ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-500'}`}>1</span>
              <span className={bookingStep >= 1 ? 'text-sky-600' : ''}>ข้อมูลตัวบุคคล</span>
            </div>
            <div className="w-10 h-[1px] bg-slate-200" />
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${bookingStep >= 2 ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-500'}`}>2</span>
              <span className={bookingStep >= 2 ? 'text-sky-600' : ''}>ตารางวันนัดหมาย</span>
            </div>
          </div>

          {bookingConfirmed ? (
            <div className="py-12 text-center space-y-6">
              <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8 stroke-[3px]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-sky-600">ลงทะเบียนสำเร็จสำเร็จ</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  ขอบพระคุณ <strong className="text-slate-900 font-bold">คุณ {clientName}</strong> ทางบัตเลอร์ส่วนตัวและคุณวริศราจะจัดเตรียมความพร้อมและติดต่อไปยังเบอร์ <strong className="text-slate-900 font-bold">{clientPhone}</strong> หรือเมล <strong className="text-slate-900 font-bold">{clientEmail}</strong> ภายใน 5 นาทีถัดจากนี้
                </p>
              </div>
              <button 
                onClick={() => {
                  setBookingConfirmed(false);
                  setBookingStep(1);
                  setClientName('');
                  setClientPhone('');
                  setClientEmail('');
                }}
                className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs text-slate-600 font-bold transition-all"
              >
                ลงทะเบียนท่านถัดไป
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              {/* STEP 1: ข้อมูลตัวบุคคล */}
              {bookingStep === 1 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-600 font-bold flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-sky-500" />
                      ชื่อ-นามสกุล ของท่าน (เพื่อระบุลงบัตรรับเชิญ)
                    </label>
                    <input 
                      type="text" 
                      placeholder="เช่น คุณธนกร มหาศาล" 
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 px-4 text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-300 focus:bg-white transition-all"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-slate-600 font-bold flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-sky-500" />
                        เบอร์มือถือตรงส่วนตัว (จำกัดการสื่อสารแบบปลอดภัย)
                      </label>
                      <input 
                        type="tel" 
                        placeholder="เช่น 089-123-4567" 
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 px-4 text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-300 focus:bg-white transition-all"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-slate-600 font-bold flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-sky-500" />
                        ที่อยู่อีเมลทางการ (สําหรับส่งข้อมูลลับ)
                      </label>
                      <input 
                        type="email" 
                        placeholder="เช่น guest@aura-luxe.com" 
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 px-4 text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-300 focus:bg-white transition-all"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={() => {
                      if (!clientName || !clientPhone) {
                        triggerNotification('กรุณากรอกข้อมูลส่วนตัวเพื่อทำการจองสิทธิ์ก่อนไปยังขั้นตอนถัดไป');
                        return;
                      }
                      setBookingStep(2);
                    }}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold text-xs uppercase tracking-widest hover:shadow-lg transition-all"
                  >
                    เลือกตารางเวลานัดหมายถัดไป
                  </button>
                </div>
              )}

              {/* STEP 2: ตารางวันและเวลานัดหมาย */}
              {bookingStep === 2 && (
                <div className="space-y-5 animate-fade-in">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-slate-600 font-bold flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-sky-500" />
                        เลือกวันประสงค์ต้องการรับบริการพิเศษ
                      </label>
                      <input 
                        type="date" 
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 px-4 text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-300 focus:bg-white transition-all"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-slate-600 font-bold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-sky-500" />
                        ช่วงเวลาอันเหมาะสมเพื่อทำการประสานงาน
                      </label>
                      <select 
                        className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-3 px-4 text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-300 focus:bg-white transition-all cursor-pointer"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        required
                      >
                        <option value="">เลือกเวลาที่ท่านสะดวก...</option>
                        <option value="09:00 - 11:30">ยามสายพฤกษศาสตร์ (09:00 - 11:30 น.)</option>
                        <option value="13:00 - 15:30">บ่ายอัครสราญ (13:00 - 15:30 น.)</option>
                        <option value="16:00 - 18:30">ยามทไวไลท์ชมสุนทรียศาสตร์ (16:00 - 18:30 น.)</option>
                      </select>
                    </div>
                  </div>

                  {/* แถบแจ้งความเป็นส่วนตัว */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-2.5 text-[10px] text-slate-500">
                    <Shield className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                    <span>ข้อมูลส่วนตัวของท่านจะถูกจัดเก็บตามมาตรฐานรักษาความปลอดภัยสูงสุด ปราศจากการทำเอกสารผ่านบุคคลที่สาม</span>
                  </div>

                  {/* ปุ่มควบคุม */}
                  <div className="grid grid-cols-3 gap-4">
                    <button 
                      type="button"
                      onClick={() => setBookingStep(1)}
                      className="py-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs uppercase transition-all"
                    >
                      ย้อนกลับ
                    </button>
                    <button 
                      type="submit"
                      className="col-span-2 py-4 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-400 to-sky-600 text-white font-black text-xs uppercase tracking-widest hover:shadow-lg transition-all"
                    >
                      ยืนยันกำหนดสิทธิ์เข้าเยี่ยมชม
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </section>

      {/* ท้ายหน้าเว็บดีไซน์สว่างเย็นพาสเทล (Elegant Pastel Footer) */}
      <footer className="max-w-7xl mx-auto px-6 pt-12 border-t border-sky-100/40 text-center space-y-6 text-xs text-slate-400">
        <div className="flex justify-center items-center gap-3">
          <Compass className="w-5 h-5 text-sky-500" />
          <span className="text-sm font-black tracking-widest bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">VARISARA AURA LUXE ATELIER CO., LTD</span>
        </div>
        <p className="max-w-md mx-auto text-[10px] text-slate-400 leading-relaxed font-semibold">
          เลขที่ 88 อาคารออร่าเพอร์เฟกต์ ชั้น 88 สุขุมวิท กรุงเทพมหานคร 10110 <br />
          โทร: 02-LUXE-AURA | อีเมล: curator@varisara-aura.luxury
        </p>
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] text-slate-400 font-bold">
          <p>© {new Date().getFullYear()} VARISARA AURA. การคัดสรรลิขสิทธิ์ทั้งหมดดำเนินการโดยบริษัทวริศราเสนีย์พิทักษ์จำกัด</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-sky-600 transition-colors">นโยบายความเป็นส่วนตัวของวีไอพี</a>
            <a href="#" className="hover:text-sky-600 transition-colors">หลักการคัดกรองอสังหาฯ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}