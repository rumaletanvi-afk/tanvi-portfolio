import { useState, useEffect } from "react";

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

// ── HASH ROUTING ─────────────────────────────────────────────
const getPageFromHash = () => {
  const hash = window.location.hash;
  if (!hash || hash === "#" || hash === "#/") return "home";
  return hash.replace("#/", "");
};

const navigateTo = (page) => {
  window.location.hash = `/${page}`;
};

// ── DATA ─────────────────────────────────────────────────────
const SAMPLES = [
  { id:-1, cat:"B2B Content Marketing", type:"Blog Sample",        title:"GEO Strategy in 2026: Your B2B Marketing Midpoint Check-in",                        client:"Independent",    desc:"A mid-year reassessment of B2B GEO strategy — covering citation quality signals, channel strategy, and why intentionality beats volume in the AI search era.",                        href:"article/geo-2026",    download:false, internal:true },
  { id:0,  cat:"Content Strategy",  type:"Thought Leadership",   title:"If Everyone Copies the Same Playbook, How Can We Expect Different Results?",         client:"Independent",    desc:"A B2B content marketing argument for specificity over generic AI-generated content — and why brands winning on LinkedIn in 2026 are the ones refusing to run the same playbook.", href:"article/playbook",    download:false, internal:true },
  { id:1,  cat:"Skincare",          type:"SEO Article",          title:"5 Benefits of Using a Vitamin C Facial Mask",                                        client:"makeO skinnsi",  desc:"SEO-driven skincare article explaining the brightening, collagen-boosting, and anti-inflammatory benefits of Vitamin C masks for Indian consumers.",                             href:"/samples/5_Benefits_Of_Using_A_Vitamin_C_Facial_Mask.pdf",                                                                              download:true  },
  { id:2,  cat:"Skincare",          type:"SEO Article",          title:"Decoding a 10-Step Korean Skincare Routine",                                         client:"makeO skinnsi",  desc:"Trend-led K-beauty guide covering hero ingredients, a 10-step routine, and makeO skinnsi product integration — written to rank for high-volume K-beauty search queries.",      href:"/samples/10_Step_Korean_skincare_Routine__Know_what_s_all_the_rage_about.pdf",                                                          download:true  },
  { id:3,  cat:"Healthcare",        type:"Patient Education",    title:"5 Common Dental Correction Procedures for Teens",                                    client:"makeO toothsi",  desc:"Consumer-friendly explainer helping parents and teens navigate orthodontic options — from invisible aligners to palatal expanders.",                                           href:"/samples/5_Common_Dental_Correction_Procedures_for_Teens.pdf",                                                                          download:true  },
  { id:4,  cat:"Healthcare",        type:"Landing Page",         title:"India's Most Affordable Aligners at makeO toothsi",                                  client:"makeO toothsi",  desc:"Conversion-focused landing page blending product education, pricing transparency, and brand voice — written to drive consultation bookings through organic search.",           href:"/samples/Get_India_s_most_affordable_aligners_at_makeO_toothsi_.pdf",                                                                   download:true  },
  { id:5,  cat:"Health & Nutrition",type:"Patient Education",    title:"Prebiotics vs. Probiotics: What's the Difference",                                   client:"Right Shift",    desc:"Research-backed explainer synthesising two clinical concepts for a midlife audience — structured for both search discoverability and genuine health literacy.",               href:"https://rightshift.in/blogs/right-health/difference-between-prebiotic-and-probiotic.html",                                             download:false },
  { id:6,  cat:"Health & Nutrition",type:"Long-Form Editorial",  title:"The Role of Exercise in Maintaining Mental Health in Middle Age",                    client:"Right Shift",    desc:"Clinical deep-dive on exercise and mental health across midlife — covering neurotransmitter effects, stress regulation, and practical exercise guidance for adults 40+.",     href:"https://rightshift.in/blogs/right-health/exercise-for-mental-wellness.html",                                                            download:false },
  { id:7,  cat:"Entertainment",     type:"OTT Review",           title:"Tandav: A Dumbed-Down Scrapbook on Indian Politics",                                 client:"Republic World",  desc:"Critical review of Amazon Prime's political thriller Tandav — a confident, opinion-led piece arguing the show sacrifices narrative coherence for shock value.",                href:"https://www.republicworld.com/entertainment/tandav-review-a-dumbed-down-scrapbook-on-indian-politics-that-cannot-be-taken-seriously",   download:false },
  { id:8,  cat:"Entertainment",     type:"Cultural Feature",     title:"Nine Artists and Bands That Were Inspired by Tolkien",                               client:"Republic World",  desc:"Cultural deep-dive tracing Tolkien's influence on musicians across genres — from Led Zeppelin to Bo Hansson.",                                                               href:"https://www.republicworld.com/entertainment/lord-of-the-rings-nine-artists-and-bands-that-were-inspired-by-tolkien",                    download:false },
  { id:9,  cat:"Journalism",        type:"Political Reporting",  title:"From Women Cops to Special Bus Service at Night, BJP Woos Women Voters",             client:"The News Minute", desc:"News report covering BJP's Karnataka election manifesto and its women-specific policy promises — written on deadline for a digital-first civic news publication.",             href:"https://www.thenewsminute.com/karnataka/women-cops-special-bus-service-night-bjp-woos-women-voters-manifesto-80698",                    download:false },
  { id:10, cat:"Journalism",        type:"Civic Reporting",      title:"Karnataka Elections 2018: Candidates and Citizens Discuss Issues",                   client:"The News Minute", desc:"On-the-ground feature from a pre-election forum — interview-based civic reporting making local governance accessible and engaging.",                                         href:"https://www.thenewsminute.com/karnataka/karnataka-elections-2018-candidates-and-citizens-come-together-discuss-issues-and-solutions",   download:false },
  { id:11, cat:"Journalism",        type:"Investigative",        title:"Why Are Unsafe Rooftop Restaurants in Bengaluru Still Open?",                       client:"The News Minute", desc:"Investigative civic piece examining regulatory failure behind unsafe rooftop venues — interviewing officials, owners, and residents to surface accountability gaps.",          href:"https://www.thenewsminute.com/karnataka/why-are-unsafe-rooftop-restaurants-bengaluru-still-open-80346",                                 download:false },
  { id:12, cat:"Journalism",        type:"Civic Reporting",      title:"Bengaluru's Mahadevapura: What Development?",                                       client:"The News Minute", desc:"Resident-focused civic report documenting infrastructure gaps, government inaction, and community frustration through on-the-ground interviews.",                            href:"https://www.thenewsminute.com/karnataka/what-development-residents-bengaluru-s-mahadevapura-upset-govt-apathy-80245",                   download:false },
];

const FEATURED_IDS = [-1, 0, 7, 9];
const CATS = ["All", "Content Strategy", "B2B Content Marketing", "Skincare", "Healthcare", "Health & Nutrition", "Entertainment", "Journalism"];

const SKILLS = [
  { heading:"Content & Strategy",  items:["Content Strategy","SEO / GEO / AEO","Long-Form Editorial","Brand Messaging","Campaign Storytelling","Healthcare Writing","Health Literacy","Patient Education","Editorial Planning","B2C & B2B Content"] },
  { heading:"AI & Workflow",        items:["GPT-4 / ChatGPT","Jasper AI","Claude","Prompt Engineering","AI-Assisted Workflows","Workflow Optimisation","A/B Testing"] },
  { heading:"Analytics & Tools",    items:["Google Analytics (GA4)","Search Console","SEMrush","Ahrefs","Adobe Analytics","Screaming Frog","Sprinklr","Brandwatch","HubSpot","Looker Studio"] },
  { heading:"Operations",           items:["WordPress (CMS)","Airtable","Asana","Microsoft Office Suite","Google Workspace","Canva"] },
];

// ── SHARED COMPONENTS ─────────────────────────────────────────

function Nav({ page }) {
  const isPortfolioSection = page === "portfolio" || page.startsWith("article/");
  return (
    <nav style={{ position:"sticky", top:0, zIndex:100, background:C.white, borderBottom:`1px solid ${C.border}`, padding:"0 48px", height:"60px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <button onClick={() => navigateTo("home")} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'EB Garamond',serif", fontWeight:700, fontSize:"17px", color:C.dark }}>
        Tanvi Rumale
      </button>
      <div style={{ display:"flex", gap:"32px", alignItems:"center" }}>
        {[["home","Home"],["portfolio","Portfolio"],["about","About"],["contact","Contact"]].map(([id,label]) => (
          <button key={id} onClick={() => navigateTo(id)}
            style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'Inter',sans-serif", fontWeight:500, fontSize:"13px", color:(page===id || (id==="portfolio" && isPortfolioSection)) ? C.dark : C.muted, borderBottom:(page===id || (id==="portfolio" && isPortfolioSection)) ? `2px solid ${C.btn}` : "2px solid transparent", paddingBottom:"2px" }}>
            {label}
          </button>
        ))}
        <button onClick={() => window.open("https://drive.google.com/file/d/1kGXxlNxV6mNG-1YeKSYyZZaG2w3_cT4X/view")}
          style={{ background:C.btn, color:C.white, border:"none", fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:"12px", padding:"8px 18px", borderRadius:"6px", cursor:"pointer" }}>
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
      <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"12px", color:"rgba(255,255,255,0.4)" }}>Content Strategist · San Francisco Bay Area · Open to opportunities</span>
      <div style={{ display:"flex", gap:"20px" }}>
        <a href="https://linkedin.com/in/tanvi-rumale" target="_blank" rel="noreferrer" style={{ color:"rgba(255,255,255,0.6)", fontFamily:"'Inter',sans-serif", fontSize:"12px", fontWeight:500, textDecoration:"none" }}>LinkedIn</a>
        <a href="mailto:rumaletanvi@gmail.com" style={{ color:"rgba(255,255,255,0.6)", fontFamily:"'Inter',sans-serif", fontSize:"12px", fontWeight:500, textDecoration:"none" }}>Email</a>
      </div>
    </footer>
  );
}

function TypeTag({ label }) {
  return <span style={{ fontFamily:"'Inter',sans-serif", fontWeight:500, fontSize:"9px", letterSpacing:"0.08em", textTransform:"uppercase", background:"rgba(30,77,56,0.08)", color:C.mid, padding:"3px 8px", borderRadius:"3px" }}>{label}</span>;
}

function SampleCard({ s }) {
  const handleClick = (e) => {
    if (s.internal) { e.preventDefault(); navigateTo(s.href); }
  };
  return (
    <div style={{ background:C.light, borderRadius:"10px", padding:"26px 24px", border:`1px solid ${C.border}`, display:"flex", flexDirection:"column", gap:"10px" }}
      onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow=`0 8px 28px rgba(30,77,56,0.1)`; e.currentTarget.style.transition="all 0.18s"; }}
      onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"6px" }}>
        <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", alignItems:"center" }}>
          <span style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"9px", letterSpacing:"0.1em", textTransform:"uppercase", color:C.mid }}>{s.cat}</span>
          <span style={{ color:C.border }}>·</span>
          <TypeTag label={s.type} />
        </div>
        <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"10px", color:C.muted }}>{s.client}</span>
      </div>
      <div style={{ fontFamily:"'EB Garamond',serif", fontWeight:600, fontSize:"15px", color:C.dark, lineHeight:1.35 }}>{s.title}</div>
      <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"13px", color:C.muted, lineHeight:1.65, flexGrow:1 }}>{s.desc}</div>
      <a href={s.internal ? `#/${s.href}` : s.href} onClick={handleClick} download={s.download} target={(!s.internal && !s.download) ? "_blank" : undefined} rel="noreferrer"
        style={{ fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:"12px", color:C.mid, textDecoration:"none", marginTop:"4px" }}>
        {s.download ? "Download PDF ↓" : "Read Article →"}
      </a>
    </div>
  );
}

// ── ARTICLE SHELL ─────────────────────────────────────────────
function ArticleShell({ cat, type, title, date, children }) {
  return (
    <div style={{ background:C.white, padding:"48px 48px 88px" }}>
      <div style={{ maxWidth:"680px", margin:"0 auto" }}>
        <button onClick={() => navigateTo("portfolio")}
          style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"'Inter',sans-serif", fontSize:"13px", color:C.muted, fontWeight:500, marginBottom:"40px", display:"flex", alignItems:"center", gap:"6px", padding:0 }}>
          ← Back to Portfolio
        </button>
        <div style={{ display:"flex", gap:"8px", alignItems:"center", marginBottom:"20px", flexWrap:"wrap" }}>
          <span style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"9px", letterSpacing:"0.1em", textTransform:"uppercase", color:C.mid }}>{cat}</span>
          <span style={{ color:C.border }}>·</span>
          <TypeTag label={type} />
        </div>
        <h1 style={{ fontFamily:"'EB Garamond',serif", fontWeight:600, fontSize:"clamp(28px,3.5vw,42px)", color:C.dark, lineHeight:1.15, marginBottom:"20px" }}>{title}</h1>
        <div style={{ display:"flex", gap:"16px", alignItems:"center", marginBottom:"48px", paddingBottom:"24px", borderBottom:`1px solid ${C.border}`, flexWrap:"wrap" }}>
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"13px", color:C.muted }}>Tanvi Rumale</span>
          <span style={{ color:C.border }}>·</span>
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"13px", color:C.muted }}>{cat}</span>
          <span style={{ color:C.border }}>·</span>
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"13px", color:C.muted }}>{date}</span>
        </div>
        {children}
        <div style={{ paddingTop:"32px", borderTop:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"12px", marginTop:"40px" }}>
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"13px", color:C.muted }}>Written by Tanvi Rumale</span>
          <button onClick={() => navigateTo("portfolio")} style={{ background:"none", border:`1px solid ${C.border}`, cursor:"pointer", fontFamily:"'Inter',sans-serif", fontSize:"13px", color:C.dark, fontWeight:500, padding:"8px 18px", borderRadius:"6px" }}>
            ← Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}

const P = ({ children }) => <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"16px", lineHeight:1.8, color:C.text, marginBottom:"22px" }}>{children}</p>;
const H2 = ({ children }) => <h2 style={{ fontFamily:"'EB Garamond',serif", fontWeight:600, fontSize:"22px", color:C.dark, margin:"36px 0 16px" }}>{children}</h2>;
const H3 = ({ children }) => <h3 style={{ fontFamily:"'EB Garamond',serif", fontWeight:600, fontSize:"18px", color:C.dark, margin:"28px 0 12px" }}>{children}</h3>;
const PullQuote = ({ children }) => (
  <blockquote style={{ borderLeft:`4px solid ${C.btn}`, background:C.light, padding:"24px 28px", borderRadius:"0 8px 8px 0", margin:"36px 0" }}>
    <p style={{ fontFamily:"'EB Garamond',serif", fontStyle:"italic", fontSize:"20px", lineHeight:1.6, color:C.dark, margin:0 }}>{children}</p>
  </blockquote>
);
const DarkQuote = ({ children }) => (
  <div style={{ background:C.dark, borderRadius:"10px", padding:"28px 32px", margin:"40px 0" }}>
    <p style={{ fontFamily:"'EB Garamond',serif", fontStyle:"italic", fontSize:"22px", color:C.white, lineHeight:1.5, margin:0 }}>{children}</p>
  </div>
);
const StatBlock = ({ stat, children }) => (
  <div style={{ background:C.light, border:`1px solid ${C.border}`, borderLeft:`4px solid ${C.btn}`, borderRadius:"0 8px 8px 0", padding:"20px 24px", margin:"28px 0" }}>
    <div style={{ fontFamily:"'EB Garamond',serif", fontWeight:700, fontSize:"32px", color:C.dark, lineHeight:1, marginBottom:"8px" }}>{stat}</div>
    <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", color:C.muted, lineHeight:1.65, margin:0 }}>{children}</p>
  </div>
);

// ── ARTICLE 1: PLAYBOOK ───────────────────────────────────────
function ArticlePlaybook() {
  return (
    <ArticleShell cat="Content Strategy" type="Thought Leadership" date="2026"
      title="If Everyone Copies the Same Playbook, How Can We Expect Different Results?">
      <P>If you're still writing generic LinkedIn content for your brand in 2026, you're probably not getting anywhere.</P>
      <P>Content Marketing 101 says: write about the problems a company targets, pain points, perspectives, and solutions. That advice still holds.</P>
      <P>But as more and more companies begin using AI for their content plans and calendars, their periodic LinkedIn posts, and their entire communications, everything blends together, and uniqueness becomes a thing of the past.</P>
      <P>We all assumed AI would be an accelerator and, to some extent, a differentiator. But today, the arena has shifted.</P>
      <P>LinkedIn has officially been facing an authenticity problem for quite some time now, with over 40% of long-form posts being fully AI-generated. This reminds me of the SEO boom and keyword overstuffing days of the past, when marketers rushed to pull traffic by sacrificing quality for rankings.</P>
      <P>All until Google had to step in and make changes. And so it goes, with LinkedIn also stepping in to fight AI slop.</P>
      <H2>So, where do marketers go from here?</H2>
      <P>Back to the basics. But this time with one thing in mind: specificity.</P>
      <P>HubSpot CMO Kipp Bodnar recommends retracing your steps and really exploring how your brand expresses itself. He suggests: build or rebuild your company's Unique Selling Proposition (USP), so you move with direction and purpose.</P>
      <P>Once that's done, companies should redirect all their attention to building personas and profiles to understand their specific pain points, needs, confusions, and preferences, and then designing marketing efforts that directly address those.</P>
      <P>Generic content will get you random engagement and will fail to capture your target audience. But speaking directly to your niche group of customers in their own language will get you into their world.</P>
      <PullQuote>"I watched this happen with a luxury chocolate brand I worked on. Their page used to lean on common category adjectives — rich, indulgent, premium — words that every competitor also used."</PullQuote>
      <P>We flipped this by describing exactly what the target audience — affluent, luxury-experience seeking 35–55-year-olds — would enjoy. "Luxury experiences" and "expertly handcrafted desserts." We started owning a specific idea no one else had claimed.</P>
      <P>We made the generic, specific — and it's the same principle that B2B brands are missing right now. Generic content won't stand out, no matter how good AI gets at generating it.</P>
      <P>So, if everyone copies the same playbook, how can we expect different results?</P>
      <DarkQuote>"Not by copying the playbook better. By refusing to run it the same way everyone else does."</DarkQuote>
    </ArticleShell>
  );
}

// ── ARTICLE 2: GEO 2026 ───────────────────────────────────────
function ArticleGeo() {
  return (
    <ArticleShell cat="B2B Content Marketing" type="Blog Sample" date="2026"
      title="GEO Strategy in 2026: Your B2B Marketing Midpoint Check-in">
      <h2 style={{ fontFamily:"'EB Garamond',serif", fontWeight:600, fontSize:"22px", color:C.dark, margin:"0 0 22px" }}>How well is your B2B GEO strategy performing in 2026?</h2>
      <P>With potential buyers and clients increasingly using AI to do their research, your brand's GEO strategy has never been more important. Since 2025, the gurus have spoken about a host of rules when it comes to GEO, and marketing teams worldwide have dove in headfirst to implement them all and test while at it.</P>
      <P>Teams had to finally take a step back from their SEO habits, particularly their obsession with rankings, and look instead at citations. Content became less of a volume game and more about covering as much of a topic as possible to rank for AI queries, and E-E-A-T signals remained top of mind for writers all around. And with the rise of Reddit's popularity as a third-party source with LLMs, marketers now had to also decide if they were ready to let go of some control and get their hands dirty by talking about their company in an organic, opinionated, and authentic setting.</P>
      <P>If you and your team have implemented these rules and ways of working in the past one year, it's time to take a moment and reassess. How do things stand in the B2B Marketing world of GEO strategy today?</P>
      <H2>How are B2B marketing teams adapting to new updates and tools in GEO in 2026?</H2>
      <P>By mid year, the script hasn't flipped entirely, but marketers have found new learnings and habits. Some worth pointing out are:</P>
      <H3>1. Using the right data signals</H3>
      <P>Marketing discussions on <a href="https://www.reddit.com/r/AEO_Strategies/comments/1umhead/how_has_your_aeo_strategy_changed_since_the_start/" target="_blank" rel="noreferrer" style={{color:C.mid, textDecoration:"underline"}}>Reddit</a> conclude that while using data to help tweak your GEO strategy is important, you can't pay attention to all the noise — the boom of all kinds of AI tools for tracking. Yes, instinctively a team will obviously want to use a tool to track the number of citations their company gets regularly.</P>
      <P>But now marketers are moving beyond that to learn about which LLMs these citations occur on, what queries they are cited for, and what is the quality of the citation. Understanding these elements can help you strategize instead of simply reacting to the GEO updates.</P>
      <H3>2. Use different channels to achieve different goals</H3>
      <StatBlock stat="85%">A recent <a href="https://www.airops.com/report/the-influence-of-offsite-signals-in-ai-search" target="_blank" rel="noreferrer" style={{color:C.mid, textDecoration:"underline"}}>Airops report</a> found that third-party sources drive 85% of brand discovery — studying thousands of brand mentions across ChatGPT, Claude, and Perplexity.</StatBlock>
      <P>The same study found that third-party sources rank 6.5x more for brand mentions on commercial top-of-the-funnel queries, over brand pages and landing pages.</P>
      <P>This calls for teams to push beyond owned content and begin treating third-party spaces like Reddit, comparison and review sites, and other forums as real channels with their own job to do: pull discovery and earn trust. Owned content such as landing pages, blogs, and other website content is still important, but they should help earn deep brand education and ultimately, conversion. When you make all your channels work for you in these ways, it becomes easier for buyers to find your company and convert.</P>
      <H3>3. Quality over quantity</H3>
      <P>SEO teams hate to admit it, but many times, ranking on Google would mean targeting certain keywords, playing the volume game, and hoping something ranks. Marketers try the same with GEO, but these efforts are in vain. GEO rewards content that is authoritative, robust, and adds value — content that really answers questions users are asking.</P>
      <P>B2B marketing teams should inherently move to prioritising comprehensive content buckets and themes that are essential to their company and focus on delivering content that hits these benchmarks rather than numbers.</P>
      <PullQuote>"What does this look like in the real world? Clean, structured content that covers your target group's questions in a question-answer format, how your company provides unique solutions, and anything else that's helpful — a real use case, a unique example, a specific infographic, or report."</PullQuote>
      <H2>Where does this leave B2B marketing teams at the midpoint of 2026?</H2>
      <P>None of these pointers mean starting over. This only means that your team needs to be intentional in their efforts. GEO rules change all the time, and the next update may bring new ways of working, but the principles remain the same: track citations, understand what they communicate about your company, be selective about your AI tracking tools so they actually explain performance rather than confuse, and most importantly, make your different channels help you achieve different goals in the customer lifecycle.</P>
      <P>The teams that will win are those that learn how to react and adapt to new GEO updates without abandoning these instincts and overhauling their entire B2B marketing playbook.</P>
    </ArticleShell>
  );
}

// ── PAGES ─────────────────────────────────────────────────────
function Home() {
  return (
    <div>
      <section style={{ background:C.white, padding:"80px 48px 72px" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr auto", gap:"60px", alignItems:"center" }}>
          <div>
            <div style={{ fontFamily:"'EB Garamond',serif", fontStyle:"italic", fontSize:"clamp(15px,1.8vw,20px)", color:C.mid, marginBottom:"18px" }}>Where the brief meets the byline.</div>
            <h1 style={{ fontFamily:"'EB Garamond',serif", fontWeight:700, fontSize:"clamp(36px,5vw,64px)", lineHeight:1.08, letterSpacing:"-0.02em", color:C.dark, marginBottom:"22px" }}>
              Tanvi Rumale,<br />Writer and Content<br />Marketing Strategist
            </h1>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"16px", lineHeight:1.75, color:C.muted, maxWidth:"500px", marginBottom:"36px" }}>
              4+ years building content programs, brand narratives, and SEO systems at Performics (Publicis Groupe) and Suntory Global Spirits. Northwestern Medill IMC. I work from the insight all the way to the words.
            </p>
            <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", marginBottom:"56px" }}>
              <button onClick={() => navigateTo("portfolio")} style={{ background:C.btn, color:C.white, border:"none", fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:"14px", padding:"13px 26px", borderRadius:"8px", cursor:"pointer" }}>View Writing Portfolio</button>
              <button onClick={() => navigateTo("about")} style={{ background:"transparent", color:C.dark, border:`2px solid ${C.dark}`, fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:"14px", padding:"13px 26px", borderRadius:"8px", cursor:"pointer" }}>About Me</button>
            </div>
            <div style={{ display:"flex", gap:"40px", flexWrap:"wrap" }}>
              {[["197%","blog traffic growth"],["70%","production time cut via AI"],["30+","clinical health articles"],["5","industry verticals"]].map(([n,l]) => (
                <div key={l} style={{ borderLeft:`3px solid ${C.border}`, paddingLeft:"14px" }}>
                  <div style={{ fontFamily:"'EB Garamond',serif", fontWeight:700, fontSize:"28px", color:C.dark, lineHeight:1 }}>{n}</div>
                  <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"11px", color:C.muted, marginTop:"4px", fontWeight:500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ alignSelf:"center" }}>
            <img src="/tanvi-photo.jpg" alt="Tanvi Rumale" style={{ width:"320px", height:"320px", objectFit:"cover", objectPosition:"center 15%", borderRadius:"50%", boxShadow:"0 24px 60px rgba(30,77,56,0.15)", display:"block" }} />
          </div>
        </div>
      </section>

      <section style={{ background:C.offBg, padding:"72px 48px" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <div style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"9px", letterSpacing:"0.14em", textTransform:"uppercase", color:C.mid, marginBottom:"10px" }}>Featured Work</div>
          <h2 style={{ fontFamily:"'EB Garamond',serif", fontWeight:700, fontSize:"clamp(24px,3vw,36px)", color:C.dark, marginBottom:"6px" }}>A selection of recent writing across industries.</h2>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", color:C.muted, marginBottom:"36px" }}>From B2B thought leadership to OTT criticism to civic journalism.</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:"16px", marginBottom:"36px" }}>
            {SAMPLES.filter(s => FEATURED_IDS.includes(s.id)).map(s => <SampleCard key={s.id} s={s} />)}
          </div>
          <div style={{ textAlign:"center" }}>
            <button onClick={() => navigateTo("portfolio")} style={{ background:"transparent", color:C.dark, border:`2px solid ${C.border}`, fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:"14px", padding:"12px 28px", borderRadius:"8px", cursor:"pointer" }}>
              View All Work →
            </button>
          </div>
        </div>
      </section>

      <section style={{ background:C.light, padding:"64px 48px" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto", display:"flex", gap:"48px", alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ flex:"1", minWidth:"280px" }}>
            <div style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"9px", letterSpacing:"0.14em", textTransform:"uppercase", color:C.mid, marginBottom:"10px" }}>Published Collection</div>
            <h2 style={{ fontFamily:"'EB Garamond',serif", fontWeight:700, fontSize:"clamp(22px,2.5vw,30px)", color:C.dark, marginBottom:"14px" }}>Right Shift Health & Wellness</h2>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"15px", lineHeight:1.75, color:C.muted, marginBottom:"24px" }}>
              A 100+ article health and wellness content program for Right Shift, ITC's healthy aging platform — covering nutrition science, chronic conditions, mental wellness, and lifestyle guidance for adults in their 40s and beyond. Written in collaboration with in-house nutritionists and physicians.
            </p>
            <a href="https://rightshift.in/blogs.html" target="_blank" rel="noreferrer" style={{ display:"inline-block", background:C.btn, color:C.white, fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:"13px", padding:"11px 22px", borderRadius:"8px", textDecoration:"none" }}>
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
        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"15px", color:C.muted, maxWidth:"560px", lineHeight:1.7, marginBottom:"40px" }}>
          A curated collection of content strategy, SEO writing, journalism, and editorial storytelling across skincare, healthcare, health & nutrition, entertainment, and news media.
        </p>
        <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"28px" }}>
          {CATS.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              style={{ ...(filter===cat ? { background:C.dark, color:C.white, border:`2px solid ${C.dark}` } : { background:"transparent", color:C.text, border:`2px solid ${C.border}` }), borderRadius:"100px", padding:"7px 16px", fontFamily:"'Inter',sans-serif", fontWeight:500, fontSize:"12px", cursor:"pointer", transition:"all 0.15s" }}>
              {cat}
            </button>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:"16px", marginBottom:"64px" }}>
          {filtered.map(s => <SampleCard key={s.id} s={s} />)}
        </div>
        <div style={{ background:C.light, borderRadius:"12px", padding:"36px 40px", border:`1px solid ${C.border}`, display:"flex", gap:"32px", alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ flex:1, minWidth:"240px" }}>
            <div style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"9px", letterSpacing:"0.12em", textTransform:"uppercase", color:C.mid, marginBottom:"8px" }}>Published Collection</div>
            <div style={{ fontFamily:"'EB Garamond',serif", fontWeight:700, fontSize:"20px", color:C.dark, marginBottom:"10px" }}>Right Shift Health & Wellness</div>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"14px", color:C.muted, lineHeight:1.7 }}>100+ research-backed articles on nutrition, chronic conditions, mental wellness, and healthy aging — written for adults 40+ in collaboration with in-house physicians and nutritionists.</p>
          </div>
          <a href="https://rightshift.in/blogs.html" target="_blank" rel="noreferrer" style={{ background:C.btn, color:C.white, fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:"13px", padding:"12px 22px", borderRadius:"8px", textDecoration:"none", whiteSpace:"nowrap" }}>
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
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"16px", lineHeight:1.8, color:C.text, marginBottom:"20px" }}>I'm a content strategist and marketing specialist with 4+ years building content programs, brand narratives, and SEO systems at Performics (Publicis Groupe) across five industries — OTT, FMCG, personal care, health, and news.</p>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"16px", lineHeight:1.8, color:C.text, marginBottom:"20px" }}>I went to Northwestern's Medill School for my M.S. in Integrated Marketing Communications, adding rigorous training in consumer insights, brand strategy, and data science to my agency foundation. My graduate consulting work with Suntory Global Spirits applied it all to a real, high-stakes U.S. brand launch.</p>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"16px", lineHeight:1.8, color:C.text, marginBottom:"40px" }}>I care about making complex things feel simple — whether that's clinical health research, a novel product category, or a brand trying to find its voice. I started out as a journalist, moved into brand and SEO content, and now work across the full content stack.</p>
            <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
              <a href="https://linkedin.com/in/tanvi-rumale" target="_blank" rel="noreferrer" style={{ background:C.btn, color:C.white, padding:"12px 24px", borderRadius:"6px", fontFamily:"'Inter',sans-serif", fontSize:"13px", fontWeight:600, textDecoration:"none" }}>LinkedIn ↗</a>
              <a href="mailto:rumaletanvi@gmail.com" style={{ background:"transparent", color:C.dark, border:`2px solid ${C.dark}`, padding:"12px 24px", borderRadius:"6px", fontFamily:"'Inter',sans-serif", fontSize:"13px", fontWeight:600, textDecoration:"none" }}>Email Me</a>
            </div>
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
          <div style={{ display:"flex", flexDirection:"column", gap:"28px" }}>
            {SKILLS.map(({ heading, items }) => (
              <div key={heading}>
                <div style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"10px", letterSpacing:"0.08em", textTransform:"uppercase", color:C.dark, marginBottom:"12px", paddingBottom:"8px", borderBottom:`2px solid ${C.border}` }}>{heading}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"7px" }}>
                  {items.map(item => <span key={item} style={{ fontFamily:"'Inter',sans-serif", fontSize:"12px", background:C.light, color:C.dark, padding:"5px 12px", borderRadius:"4px", border:`1px solid ${C.border}` }}>{item}</span>)}
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
          <a href="mailto:rumaletanvi@gmail.com" style={{ fontFamily:"'Inter',sans-serif", fontWeight:500, fontSize:"14px", color:C.dark, textDecoration:"none" }}>✉ rumaletanvi@gmail.com</a>
          <a href="https://linkedin.com/in/tanvi-rumale" target="_blank" rel="noreferrer" style={{ fontFamily:"'Inter',sans-serif", fontWeight:500, fontSize:"14px", color:C.dark, textDecoration:"none" }}>⬡ LinkedIn</a>
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
                <input type={type} value={form[field]} onChange={e => setForm({...form,[field]:e.target.value})} required style={{ width:"100%", fontFamily:"'Inter',sans-serif", fontSize:"14px", color:C.text, border:`1px solid ${C.border}`, borderRadius:"6px", padding:"12px 14px", background:C.offBg, outline:"none", boxSizing:"border-box" }} />
              </div>
            ))}
            <div>
              <label style={{ fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:"12px", color:C.dark, display:"block", marginBottom:"7px", letterSpacing:"0.02em", textTransform:"uppercase" }}>Message</label>
              <textarea value={form.message} onChange={e => setForm({...form,message:e.target.value})} required rows={5} style={{ width:"100%", fontFamily:"'Inter',sans-serif", fontSize:"14px", color:C.text, border:`1px solid ${C.border}`, borderRadius:"6px", padding:"12px 14px", background:C.offBg, outline:"none", resize:"vertical", boxSizing:"border-box" }} />
            </div>
            <button type="submit" style={{ background:C.btn, color:C.white, border:"none", fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"14px", padding:"14px", borderRadius:"8px", cursor:"pointer" }}>Send Message</button>
          </form>
        )}
      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState(getPageFromHash());

  useEffect(() => {
    const handleHashChange = () => setPage(getPageFromHash());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.textContent = `* { margin:0; padding:0; box-sizing:border-box; } html { scroll-behavior:smooth; } body { background:#fff; } input:focus, textarea:focus { border-color:#4D9171 !important; }`;
    document.head.appendChild(style);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const pages = {
    "home":             <Home />,
    "portfolio":        <Portfolio />,
    "about":            <About />,
    "contact":          <Contact />,
    "article/playbook": <ArticlePlaybook />,
    "article/geo-2026": <ArticleGeo />,
  };

  return (
    <div style={{ fontFamily:"'Inter',sans-serif", background:C.bg, color:C.text, minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      <Nav page={page} />
      <div style={{ flex:1 }}>{pages[page] || <Home />}</div>
      <Footer />
    </div>
  );
}
