import { useState, useEffect } from "react";

// ── PALETTE ──────────────────────────────────────────────────
const C = {
  dark:   "#1E4D38",
  mid:    "#3A7558",
  btn:    "#4D9171",
  light:  "#EEF5F0",
  border: "#C8DECE",
  bg:     "#FFFFFF",
  offBg:  "#F9FBF9",
  text:   "#2C3830",
  muted:  "#667A6E",
  white:  "#FFFFFF",
};

// ── DATA ─────────────────────────────────────────────────────

// Pinned "coming soon" pieces — strategic writing in progress
const COMING_SOON = [
  {
    id: "cs1",
    cat: "Brand Strategy",
    type: "Brand Analysis",
    title: "Coach Spring 2026: What the In-Store Activation Got Right (And What It Didn't)",
    client: "Independent Analysis",
    desc: "A brand strategist's close read of Coach's Spring 2026 in-store activation — examining the campaign mechanics, cultural positioning, and what it signals about Coach's broader repositioning towards a younger American consumer.",
  },
  {
    id: "cs2",
    cat: "Content Strategy",
    type: "Strategy POV",
    title: "Why Reddit and Quora Are the Most Underrated GEO Channels for B2B Brands",
    client: "Independent",
    desc: "A practical argument for treating Reddit and Quora as GEO discoverability infrastructure — not just community platforms — in an AI-search-first world, with actionable frameworks for B2B content teams.",
  },
];

const SAMPLES = [
  // Skincare
  { id:1,  cat:"Skincare",           type:"SEO Article",          title:"5 Benefits of Using a Vitamin C Facial Mask",                            client:"makeO skinnsi",   desc:"SEO-driven skincare article explaining the brightening, collagen-boosting, and anti-inflammatory benefits of Vitamin C masks for Indian consumers.",                                                                 href:"/samples/5_Benefits_Of_Using_A_Vitamin_C_Facial_Mask.pdf",                                                                              download:true  },
  { id:2,  cat:"Skincare",           type:"SEO Article",          title:"Decoding a 10-Step Korean Skincare Routine",                             client:"makeO skinnsi",   desc:"Trend-led K-beauty guide covering hero ingredients, a 10-step routine, and makeO skinnsi product integration — written to rank for high-volume K-beauty search queries.",                                               href:"/samples/10_Step_Korean_skincare_Routine__Know_what_s_all_the_rage_about.pdf",                                                          download:true  },
  // Healthcare
  { id:3,  cat:"Healthcare",         type:"Patient Education",    title:"5 Common Dental Correction Procedures for Teens",                        client:"makeO toothsi",   desc:"Consumer-friendly explainer helping parents and teens navigate orthodontic options — from invisible aligners to palatal expanders — written for clarity and clinical accuracy.",                                           href:"/samples/5_Common_Dental_Correction_Procedures_for_Teens.pdf",                                                                          download:true  },
  { id:4,  cat:"Healthcare",         type:"Landing Page",         title:"India's Most Affordable Aligners at makeO toothsi",                      client:"makeO toothsi",   desc:"Conversion-focused landing page blending product education, pricing transparency, and brand voice — written to drive consultation bookings through organic search.",                                                       href:"/samples/Get_India_s_most_affordable_aligners_at_makeO_toothsi_.pdf",                                                                   download:true  },
  // Health & Nutrition
  { id:5,  cat:"Health & Nutrition", type:"Patient Education",    title:"Prebiotics vs. Probiotics: What's the Difference",                       client:"Right Shift",     desc:"Research-backed explainer synthesising two clinical concepts for a midlife audience — structured for both search discoverability and genuine health literacy.",                                                         href:"https://rightshift.in/blogs/right-health/difference-between-prebiotic-and-probiotic.html",                                             download:false },
  { id:6,  cat:"Health & Nutrition", type:"Long-Form Editorial",  title:"The Role of Exercise in Maintaining Mental Health in Middle Age",         client:"Right Shift",     desc:"Clinical deep-dive on exercise and mental health across midlife — covering neurotransmitter effects, stress regulation, and practical exercise guidance for adults 40+.",                                                href:"https://rightshift.in/blogs/right-health/exercise-for-mental-wellness.html",                                                            download:false },
  // Entertainment
  { id:7,  cat:"Entertainment",      type:"OTT Review",           title:"Tandav: A Dumbed-Down Scrapbook on Indian Politics",                      client:"Republic World",  desc:"Critical review of Amazon Prime's political thriller Tandav — a confident, opinion-led piece arguing the show sacrifices narrative coherence for shock value.",                                                           href:"https://www.republicworld.com/entertainment/tandav-review-a-dumbed-down-scrapbook-on-indian-politics-that-cannot-be-taken-seriously",   download:false },
  { id:8,  cat:"Entertainment",      type:"Cultural Feature",     title:"Nine Artists and Bands That Were Inspired by Tolkien",                    client:"Republic World",  desc:"Cultural deep-dive tracing Tolkien's influence on musicians across genres — from Led Zeppelin to Bo Hansson — showing range and a more relaxed, curious editorial voice.",                                              href:"https://www.republicworld.com/entertainment/lord-of-the-rings-nine-artists-and-bands-that-were-inspired-by-tolkien",                    download:false },
  // Journalism
  { id:9,  cat:"Journalism",         type:"Political Reporting",  title:"From Women Cops to Special Bus Service at Night, BJP Woos Women Voters",  client:"The News Minute", desc:"News report covering BJP's Karnataka election manifesto and its women-specific policy promises — written on deadline for a digital-first civic news publication.",                                                       href:"https://www.thenewsminute.com/karnataka/women-cops-special-bus-service-night-bjp-woos-women-voters-manifesto-80698",                    download:false },
  { id:10, cat:"Journalism",         type:"Civic Reporting",      title:"Karnataka Elections 2018: Candidates and Citizens Discuss Issues",        client:"The News Minute", desc:"On-the-ground feature from a pre-election forum — interview-based civic reporting making local governance accessible and engaging to a general readership.",                                                             href:"https://www.thenewsminute.com/karnataka/karnataka-elections-2018-candidates-and-citizens-come-together-discuss-issues-and-solutions",   download:false },
  { id:11, cat:"Journalism",         type:"Investigative",        title:"Why Are Unsafe Rooftop Restaurants in Bengaluru Still Open?",            client:"The News Minute", desc:"Investigative civic piece examining regulatory failure behind unsafe rooftop venues — interviewing officials, owners, and residents to surface accountability gaps.",                                                    href:"https://www.thenewsminute.com/karnataka/why-are-unsafe-rooftop-restaurants-bengaluru-still-open-80346",                                 download:false },
  { id:12, cat:"Journalism",         type:"Civic Reporting",      title:"Bengaluru's Mahadevapura: What Development?",                            client:"The News Minute", desc:"Resident-focused civic report documenting infrastructure gaps, government inaction, and community frustration through on-the-ground interviews ahead of Karnataka elections.",                                           href:"https://www.thenewsminute.com/karnataka/what-development-residents-bengaluru-s-mahadevapura-upset-govt-apathy-80245",                   download:false },
];

const FEATURED_IDS = [7, 9, 5, 2]; // Tandav, BJP journalism, Prebiotics, Korean skincare
const CATS = ["All", "Skincare", "Healthcare", "Health & Nutrition", "Entertainment", "Journalism"];

const SKILLS = [
  { heading:"Content & Strategy",  items:["Content Strategy","SEO / GEO / AEO","Long-Form Editorial","Brand Messaging","Campaign Storytelling","Healthcare Writing","Health Literacy","Patient Education","Editorial Planning","B2C & B2B Content"] },
  { heading:"AI & Workflow",        items:["GPT-4 / ChatGPT","Jasper AI","Claude","Prompt Engineering","AI-Assisted Workflows","Workflow Optimisation","A/B Testing"] },
  { heading:"Analytics & Tools",    items:["Google Analytics (GA4)","Search Console","SEMrush","Ahrefs","Adobe Analytics","Screaming Frog","Sprinklr","Brandwatch","HubSpot","Looker Studio"] },
  { heading:"Operations",           items:["WordPress (CMS)","Airtable","Asana","Microsoft Office Suite","Google Workspace","Canva"] },
];

// ── SHARED COMPONENTS ────────────────────────────────────────

function Nav({ page, setPage }) {
  return (
    <nav style={{ position:"sticky", top:0, zIndex:100, background:C.white, borderBottom:`1px solid ${C.border}`, padding:"0 48px", height:"60px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <button onClick={() => setPage("home")} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'EB Garamond',serif", fontWeight:700, fontSize:"17px", color:C.dark, letterSpacing:"-0.01em" }}>
        Tanvi Rumale
      </button>
      <div style={{ display:"flex", gap:"32px", alignItems:"center" }}>
        {[["home","Home"],["portfolio","Portfolio"],["about","About"],["contact","Contact"]].map(([id,label]) => (
          <button key={id} onClick={() => setPage(id)} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'Inter',sans-serif", fontWeight:500, fontSize:"13px", color:page===id ? C.dark : C.muted, borderBottom:page===id ? `2px solid ${C.btn}` : "2px solid transparent", paddingBottom:"2px", letterSpacing:"0.01em", transition:"color 0.15s" }}>
            {label}
          </button>
        ))}
        <button onClick={() => window.open("https://drive.google.com/file/d/1kGXxlNxV6mNG-1YeKSYyZZaG2w3_cT4X/view")} style={{ background:C.btn, color:C.white, border:"none", fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:"12px", padding:"8px 18px", borderRadius:"6px", cursor:"pointer", letterSpacing:"0.01em" }}>
          Resume ↓
        </button>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer style={{ background:C.dark, padding:"32px 48px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"12px" }}>
      <span style={{ fontFamily:"'EB Garamond',serif", fontWeight:700, color:C.white, fontSize:"15px" }}>Tanvi Rumale</span>
      <span style={{ fontFamily:"'Inter',sans-serif", fontStyle:"italic", fontSize:"12px", color:"rgba(255,255,255,0.4)" }}>Content Strategist · San Francisco Bay Area · Open to opportunities</span>
      <div style={{ display:"flex", gap:"20px" }}>
        <a href="https://linkedin.com/in/tanvi-rumale" target="_blank" rel="noreferrer" style={{ color:"rgba(255,255,255,0.6)", fontFamily:"'Inter',sans-serif", fontSize:"12px", fontWeight:500, textDecoration:"none" }}>LinkedIn</a>
        <a href="mailto:rumaletanvi@gmail.com" style={{ color:"rgba(255,255,255,0.6)", fontFamily:"'Inter',sans-serif", fontSize:"12px", fontWeight:500, textDecoration:"none" }}>Email</a>
      </div>
    </footer>
  );
}

function TypeTag({ label }) {
  return (
    <span style={{ fontFamily:"'Inter',sans-serif", fontWeight:500, fontSize:"9px", letterSpacing:"0.08em", textTransform:"uppercase", background:"rgba(30,77,56,0.08)", color:C.mid, padding:"3px 8px", borderRadius:"3px" }}>
      {label}
    </span>
  );
}

function SampleCard({ s }) {
  return (
    <div style={{ background:C.light, borderRadius:"10px", padding:"26px 24px", border:`1px solid ${C.border}`, display:"flex", flexDirection:"column", gap:"10px" }}
      onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow=`0 8px 28px rgba(30,77,56,0.1)`; e.currentTarget.style.transition="all 0.18s"; }}
      onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"6px" }}>
        <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
          <span style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"9px", letterSpacing:"0.1em", textTransform:"uppercase", color:C.mid }}>{s.cat}</span>
          <span style={{ color:C.border }}>·</span>
          <TypeTag label={s.type} />
        </div>
        <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"10px", color:C.muted }}>{s.client}</span>
      </div>
      <div style={{ fontFamily:"'EB Garamond',serif", fontWeight:600, fontSize:"15px", color:C.dark, lineHeight:1.35 }}>{s.title}</div>
      <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"13px", color:C.muted, lineHeight:1.65, flexGrow:1 }}>{s.desc}</div>
      <a href={s.href} download={s.download} target={s.download ? undefined : "_blank"} rel="noreferrer"
        style={{ fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:"12px", color:C.mid, textDecoration:"none", marginTop:"4px" }}>
        {s.download ? "Download PDF ↓" : "Read Article →"}
      </a>
    </div>
  );
}

function ComingSoonCard({ s }) {
  return (
    <div style={{ background:C.offBg, borderRadius:"10px", padding:"26px 24px", border:`1px solid ${C.border}`, display:"flex", flexDirection:"column", gap:"10px", opacity:0.85 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"6px" }}>
        <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
          <span style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"9px", letterSpacing:"0.1em", textTransform:"uppercase", color:C.mid }}>{s.cat}</span>
          <span style={{ color:C.border }}>·</span>
          <TypeTag label={s.type} />
        </div>
        <span style={{ fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:"9px", letterSpacing:"0.1em", textTransform:"uppercase", color:C.btn, background:C.light, padding:"3px 8px", borderRadius:"3px" }}>Coming Soon</span>
      </div>
      <div style={{ fontFamily:"'EB Garamond',serif", fontWeight:600, fontSize:"15px", color:C.dark, lineHeight:1.35 }}>{s.title}</div>
      <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"13px", color:C.muted, lineHeight:1.65, flexGrow:1 }}>{s.desc}</div>
      <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"12px", color:C.border, fontStyle:"italic" }}>In progress — check back soon</div>
    </div>
  );
}

// ── PAGES ────────────────────────────────────────────────────

function Home({ setPage }) {
  return (
    <div>
      {/* Hero */}
      <section style={{ background:C.white, padding:"80px 48px 72px" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr auto", gap:"60px", alignItems:"flex-start" }}>

          {/* Left: text */}
          <div>
            <div style={{ fontFamily:"'EB Garamond',serif", fontStyle:"italic", fontSize:"clamp(15px,1.8vw,20px)", color:C.mid, marginBottom:"18px" }}>
              Where the brief meets the byline.
            </div>
            <h1 style={{ fontFamily:"'EB Garamond',serif", fontWeight:700, fontSize:"clamp(36px,5vw,64px)", lineHeight:1.08, letterSpacing:"-0.02em", color:C.dark, marginBottom:"22px" }}>
              Tanvi Rumale,<br />Writer and Content<br />Marketing Strategist
            </h1>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"16px", lineHeight:1.75, color:C.muted, maxWidth:"500px", marginBottom:"36px", fontWeight:400 }}>
              4+ years building content programs, brand narratives, and SEO systems at Performics (Publicis Groupe) and Suntory Global Spirits. Northwestern Medill IMC. I work from the insight all the way to the words.
            </p>
            <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", marginBottom:"56px" }}>
              <button onClick={() => setPage("portfolio")} style={{ background:C.btn, color:C.white, border:"none", fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:"14px", padding:"13px 26px", borderRadius:"8px", cursor:"pointer" }}>
                View Writing Portfolio
              </button>
              <button onClick={() => setPage("about")} style={{ background:"transparent", color:C.dark, border:`2px solid ${C.dark}`, fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:"14px", padding:"13px 26px", borderRadius:"8px", cursor:"pointer" }}>
                About Me
              </button>
            </div>
            {/* Stats */}
            <div style={{ display:"flex", gap:"40px", flexWrap:"wrap" }}>
              {[["197%","blog traffic growth"],["70%","production time cut via AI"],["30+","clinical health articles"],["5","industry verticals"]].map(([n,l]) => (
                <div key={l} style={{ borderLeft:`3px solid ${C.border}`, paddingLeft:"14px" }}>
                  <div style={{ fontFamily:"'EB Garamond',serif", fontWeight:700, fontSize:"28px", color:C.dark, lineHeight:1 }}>{n}</div>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"11px", color:C.muted, marginTop:"4px", fontWeight:500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: photo — put tanvi-photo.jpg in /public folder */}
          <div style={{ alignSelf:"center", marginTop:"0" }}>
            <img
              src="/tanvi-photo.jpg"
              alt="Tanvi Rumale"
              style={{ width:"320px", height:"320px", objectFit:"cover", objectPosition:"center 15%", borderRadius:"50%", boxShadow:"0 24px 60px rgba(30,77,56,0.15)", display:"block" }}
            />
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section style={{ background:C.offBg, padding:"72px 48px" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <div style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"9px", letterSpacing:"0.14em", textTransform:"uppercase", color:C.mid, marginBottom:"10px" }}>Featured Work</div>
          <h2 style={{ fontFamily:"'EB Garamond',serif", fontWeight:700, fontSize:"clamp(24px,3vw,36px)", color:C.dark, marginBottom:"6px" }}>A selection of recent writing across industries.</h2>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", color:C.muted, marginBottom:"36px" }}>From clinical patient education to OTT criticism to civic journalism.</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:"16px", marginBottom:"36px" }}>
            {SAMPLES.filter(s => FEATURED_IDS.includes(s.id)).map(s => <SampleCard key={s.id} s={s} />)}
          </div>
          <div style={{ textAlign:"center" }}>
            <button onClick={() => setPage("portfolio")} style={{ background:"transparent", color:C.dark, border:`2px solid ${C.border}`, fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:"14px", padding:"12px 28px", borderRadius:"8px", cursor:"pointer" }}>
              View All Work →
            </button>
          </div>
        </div>
      </section>

      {/* Right Shift Collection */}
      <section style={{ background:C.light, padding:"64px 48px" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto", display:"flex", gap:"48px", alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ flex:"1", minWidth:"280px" }}>
            <div style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"9px", letterSpacing:"0.14em", textTransform:"uppercase", color:C.mid, marginBottom:"10px" }}>Published Collection</div>
            <h2 style={{ fontFamily:"'EB Garamond',serif", fontWeight:700, fontSize:"clamp(22px,2.5vw,30px)", color:C.dark, marginBottom:"14px" }}>Right Shift Health & Wellness</h2>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"15px", lineHeight:1.75, color:C.muted, marginBottom:"24px" }}>
              A 100+ article health and wellness content program for Right Shift, ITC's healthy aging platform — covering nutrition science, chronic conditions, mental wellness, and lifestyle guidance for adults in their 40s and beyond. Written in collaboration with in-house nutritionists and physicians.
            </p>
            <a href="https://rightshift.in/blogs.html" target="_blank" rel="noreferrer"
              style={{ display:"inline-block", background:C.btn, color:C.white, fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:"13px", padding:"11px 22px", borderRadius:"8px", textDecoration:"none" }}>
              Browse the Full Collection →
            </a>
          </div>
          <div style={{ flex:"1", minWidth:"240px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
            {["Right Nutrition","Right Lifestyle","Right Mindset","Right Health"].map(cat => (
              <div key={cat} style={{ background:C.white, borderRadius:"8px", padding:"16px", border:`1px solid ${C.border}` }}>
                <div style={{ fontFamily:"'EB Garamond',serif", fontWeight:600, fontSize:"13px", color:C.dark, marginBottom:"4px" }}>{cat}</div>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"11px", color:C.muted }}>25+ articles</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How I Approach */}
      <section style={{ background:C.white, padding:"72px 48px" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <h2 style={{ fontFamily:"'EB Garamond',serif", fontWeight:700, fontSize:"clamp(22px,3vw,34px)", color:C.dark, marginBottom:"36px" }}>How I Approach Content Strategy</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"20px" }}>
            {[
              { icon:"◎", title:"Insight-Led Content", body:"I start with the brief, not the blank page. Consumer research, search intent, and brand positioning inform every content decision I make." },
              { icon:"◈", title:"SEO + Brand Storytelling", body:"I combine keyword strategy with narrative craft — so content earns rankings without sacrificing the voice that makes brands feel human." },
              { icon:"◫", title:"Systems That Scale", body:"I build repeatable content engines, not one-off articles. Editorial frameworks, AI-assisted workflows, and QA processes that keep quality consistent at volume." },
            ].map(p => (
              <div key={p.title} style={{ background:C.light, borderRadius:"10px", padding:"32px 28px", border:`1px solid ${C.border}` }}>
                <div style={{ fontSize:"20px", color:C.btn, marginBottom:"14px" }}>{p.icon}</div>
                <div style={{ fontFamily:"'EB Garamond',serif", fontWeight:700, fontSize:"17px", color:C.dark, marginBottom:"10px" }}>{p.title}</div>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", color:C.muted, lineHeight:1.7 }}>{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Portfolio() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? SAMPLES : SAMPLES.filter(s => s.cat === filter);

  return (
    <div style={{ background:C.white, padding:"64px 48px 88px" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
        <h1 style={{ fontFamily:"'EB Garamond',serif", fontWeight:700, fontSize:"clamp(30px,4vw,50px)", color:C.dark, marginBottom:"10px" }}>Writing Portfolio</h1>
        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"15px", color:C.muted, maxWidth:"560px", lineHeight:1.7, marginBottom:"48px" }}>
          A curated collection of content strategy, SEO writing, journalism, and editorial storytelling across skincare, healthcare, health & nutrition, entertainment, and news media.
        </p>

        {/* Coming soon — pinned at top */}
        <div style={{ marginBottom:"48px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"16px" }}>
            <div style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"9px", letterSpacing:"0.14em", textTransform:"uppercase", color:C.mid }}>New Work — In Progress</div>
            <div style={{ flex:1, height:"1px", background:C.border }} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:"16px" }}>
            {COMING_SOON.map(s => <ComingSoonCard key={s.id} s={s} />)}
          </div>
        </div>

        {/* Filters */}
        <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"28px" }}>
          {CATS.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              style={{ ...(filter===cat ? { background:C.dark, color:C.white, border:`2px solid ${C.dark}` } : { background:"transparent", color:C.text, border:`2px solid ${C.border}` }), borderRadius:"100px", padding:"7px 16px", fontFamily:"'Inter',sans-serif", fontWeight:500, fontSize:"12px", cursor:"pointer", transition:"all 0.15s" }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Samples grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:"16px", marginBottom:"64px" }}>
          {filtered.map(s => <SampleCard key={s.id} s={s} />)}
        </div>

        {/* Right Shift banner */}
        <div style={{ background:C.light, borderRadius:"12px", padding:"36px 40px", border:`1px solid ${C.border}`, display:"flex", gap:"32px", alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ flex:1, minWidth:"240px" }}>
            <div style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"9px", letterSpacing:"0.12em", textTransform:"uppercase", color:C.mid, marginBottom:"8px" }}>Published Collection</div>
            <div style={{ fontFamily:"'EB Garamond',serif", fontWeight:700, fontSize:"20px", color:C.dark, marginBottom:"10px" }}>Right Shift Health & Wellness</div>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", color:C.muted, lineHeight:1.7 }}>
              100+ research-backed articles on nutrition, chronic conditions, mental wellness, and healthy aging — written for adults 40+ in collaboration with in-house physicians and nutritionists.
            </p>
          </div>
          <a href="https://rightshift.in/blogs.html" target="_blank" rel="noreferrer"
            style={{ background:C.btn, color:C.white, fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:"13px", padding:"12px 22px", borderRadius:"8px", textDecoration:"none", whiteSpace:"nowrap" }}>
            Browse the Collection →
          </a>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div style={{ background:C.white, padding:"64px 48px 88px" }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
        <h1 style={{ fontFamily:"'EB Garamond',serif", fontWeight:700, fontSize:"clamp(30px,4vw,50px)", color:C.dark, marginBottom:"48px" }}>About</h1>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"72px", alignItems:"start" }}>
          <div>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"16px", lineHeight:1.8, color:C.text, marginBottom:"20px" }}>
              I'm a content strategist and marketing specialist with 4+ years building content programs, brand narratives, and SEO systems at Performics (Publicis Groupe) across five industries — OTT, FMCG, personal care, health, and news.
            </p>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"16px", lineHeight:1.8, color:C.text, marginBottom:"20px" }}>
              I went to Northwestern's Medill School for my M.S. in Integrated Marketing Communications, adding rigorous training in consumer insights, brand strategy, and data science to my agency foundation. My graduate consulting work with Suntory Global Spirits applied it all to a real, high-stakes U.S. brand launch.
            </p>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"16px", lineHeight:1.8, color:C.text, marginBottom:"40px" }}>
              I care about making complex things feel simple — whether that's clinical health research, a novel product category, or a brand trying to find its voice. I started out as a journalist, moved into brand and SEO content, and now work across the full content stack: from editorial strategy and brand narrative to campaign planning and performance optimisation.
            </p>
            <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
              <a href="https://linkedin.com/in/tanvi-rumale" target="_blank" rel="noreferrer" style={{ background:C.btn, color:C.white, padding:"12px 24px", borderRadius:"6px", fontFamily:"'Inter',sans-serif", fontSize:"13px", fontWeight:600, textDecoration:"none" }}>LinkedIn ↗</a>
              <a href="mailto:rumaletanvi@gmail.com" style={{ background:"transparent", color:C.dark, border:`2px solid ${C.dark}`, padding:"12px 24px", borderRadius:"6px", fontFamily:"'Inter',sans-serif", fontSize:"13px", fontWeight:600, textDecoration:"none" }}>Email Me</a>
            </div>

            {/* Education */}
            <div style={{ background:C.dark, borderRadius:"10px", padding:"28px 32px", marginTop:"40px" }}>
              <div style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"9px", letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.45)", marginBottom:"18px" }}>Education</div>
              <div style={{ marginBottom:"16px", paddingBottom:"16px", borderBottom:"1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontFamily:"'EB Garamond',serif", fontWeight:600, fontSize:"15px", color:C.white, marginBottom:"4px" }}>M.S. Integrated Marketing Communications</div>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.45)" }}>Northwestern University, Medill · 2024–2025 · GPA 3.7</div>
              </div>
              <div>
                <div style={{ fontFamily:"'EB Garamond',serif", fontWeight:600, fontSize:"15px", color:C.white, marginBottom:"4px" }}>B.A. (Hons.) Communication Studies</div>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.45)" }}>Mount Carmel College, Bangalore University · 2017–2020</div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div style={{ display:"flex", flexDirection:"column", gap:"28px" }}>
            {SKILLS.map(({ heading, items }) => (
              <div key={heading}>
                <div style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"10px", letterSpacing:"0.08em", textTransform:"uppercase", color:C.dark, marginBottom:"12px", paddingBottom:"8px", borderBottom:`2px solid ${C.border}` }}>{heading}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"7px" }}>
                  {items.map(item => (
                    <span key={item} style={{ fontFamily:"'Inter',sans-serif", fontSize:"12px", background:C.light, color:C.dark, padding:"5px 12px", borderRadius:"4px", border:`1px solid ${C.border}` }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `mailto:rumaletanvi@gmail.com?subject=Portfolio enquiry from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message + "\n\nFrom: " + form.email)}`;
    setSent(true);
  };

  return (
    <div style={{ background:C.white, padding:"64px 48px 88px" }}>
      <div style={{ maxWidth:"600px", margin:"0 auto" }}>
        <h1 style={{ fontFamily:"'EB Garamond',serif", fontWeight:700, fontSize:"clamp(30px,4vw,50px)", color:C.dark, marginBottom:"10px" }}>Get in Touch</h1>
        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"16px", color:C.muted, marginBottom:"32px" }}>Interested in working together? I'd love to hear from you.</p>
        <div style={{ display:"flex", gap:"20px", marginBottom:"40px", flexWrap:"wrap" }}>
          <a href="mailto:rumaletanvi@gmail.com" style={{ fontFamily:"'Inter',sans-serif", fontWeight:500, fontSize:"14px", color:C.dark, textDecoration:"none", display:"flex", alignItems:"center", gap:"6px" }}>✉ rumaletanvi@gmail.com</a>
          <a href="https://linkedin.com/in/tanvi-rumale" target="_blank" rel="noreferrer" style={{ fontFamily:"'Inter',sans-serif", fontWeight:500, fontSize:"14px", color:C.dark, textDecoration:"none", display:"flex", alignItems:"center", gap:"6px" }}>⬡ LinkedIn</a>
        </div>
        {sent ? (
          <div style={{ background:C.light, borderRadius:"10px", padding:"32px", border:`1px solid ${C.border}`, textAlign:"center" }}>
            <div style={{ fontFamily:"'EB Garamond',serif", fontWeight:700, fontSize:"18px", color:C.dark, marginBottom:"8px" }}>Thanks for reaching out!</div>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", color:C.muted }}>Your mail client should have opened. If not, email me directly at rumaletanvi@gmail.com.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
            {[["Name","name","text"],["Email","email","email"]].map(([label,field,type]) => (
              <div key={field}>
                <label style={{ fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:"12px", color:C.dark, display:"block", marginBottom:"7px", letterSpacing:"0.02em", textTransform:"uppercase" }}>{label}</label>
                <input type={type} value={form[field]} onChange={e => setForm({...form,[field]:e.target.value})} required
                  style={{ width:"100%", fontFamily:"'Inter',sans-serif", fontSize:"14px", color:C.text, border:`1px solid ${C.border}`, borderRadius:"6px", padding:"12px 14px", background:C.offBg, outline:"none", boxSizing:"border-box" }} />
              </div>
            ))}
            <div>
              <label style={{ fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:"12px", color:C.dark, display:"block", marginBottom:"7px", letterSpacing:"0.02em", textTransform:"uppercase" }}>Message</label>
              <textarea value={form.message} onChange={e => setForm({...form,message:e.target.value})} required rows={5}
                style={{ width:"100%", fontFamily:"'Inter',sans-serif", fontSize:"14px", color:C.text, border:`1px solid ${C.border}`, borderRadius:"6px", padding:"12px 14px", background:C.offBg, outline:"none", resize:"vertical", boxSizing:"border-box" }} />
            </div>
            <button type="submit" style={{ background:C.btn, color:C.white, border:"none", fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"14px", padding:"14px", borderRadius:"8px", cursor:"pointer" }}>
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ── APP ──────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      * { margin:0; padding:0; box-sizing:border-box; }
      html { scroll-behavior:smooth; }
      body { background:#fff; }
      input:focus, textarea:focus { border-color:#4D9171 !important; box-shadow:0 0 0 3px rgba(77,145,113,0.1) !important; }
      @media (max-width:768px) {
        .hero-inner { flex-direction:column-reverse !important; }
        .hero-photo { width:100% !important; height:260px !important; }
        .about-grid { grid-template-columns:1fr !important; gap:40px !important; }
      }
    `;
    document.head.appendChild(style);
    window.scrollTo(0, 0);
  }, [page]);

  const pages = { home:<Home setPage={setPage} />, portfolio:<Portfolio />, about:<About />, contact:<Contact /> };

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", background:C.bg, color:C.text, minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      <Nav page={page} setPage={setPage} />
      <div style={{ flex:1 }}>{pages[page]}</div>
      <Footer />
    </div>
  );
}
