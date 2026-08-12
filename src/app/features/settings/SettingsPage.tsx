import { Settings, User, Sliders, CreditCard, Moon, Sun, Check, Crown } from "lucide-react";
import { useSettings } from "../../hooks/useSettings";
import { useTheme } from "../../hooks/useTheme";

export function SettingsPage() {
  const {
    name, setName,
    handle, setHandle,
    email, setEmail,
    bio, setBio,
    defaultEra, setDefaultEra,
    defaultStyle, setDefaultStyle,
    defaultRatio, setDefaultRatio,
    autoEnhance, setAutoEnhance,
    highResUpscale, setHighResUpscale,
    saved,
    handleSave,
  } = useSettings();

  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#121212] p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C8A14B]/30 bg-[#C8A14B]/8 text-[#C8A14B] text-[11px] font-semibold tracking-wide mb-3">
            <Settings size={12} /> Royal Atelier Configuration
          </div>
          <h1
            className="text-[#222] dark:text-[#F5F0E8]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.4rem", fontWeight: 400 }}
          >
            Account &amp; Atelier Settings
          </h1>
          <p className="text-sm text-[#6F6F6F] mt-1">
            Manage your artist profile, AI generation defaults, and PRO membership credits
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-full bg-[#C8A14B] text-white text-sm font-medium shadow-[0_4px_18px_rgba(200,161,75,0.35)] hover:bg-[#d4af56] transition-all flex items-center gap-2"
        >
          {saved ? (
            <>
              <Check size={16} /> Saved Successfully
            </>
          ) : (
            <>Save Changes</>
          )}
        </button>
      </div>

      <div className="max-w-4xl space-y-8">
        {/* Artist Profile Section */}
        <div className="rounded-3xl border border-[#C8A14B]/20 bg-white/70 dark:bg-[#1A1814]/85 backdrop-blur-xl p-6 lg:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#C8A14B]/14">
            <div className="w-9 h-9 rounded-xl bg-[#C8A14B]/10 flex items-center justify-center">
              <User size={16} className="text-[#C8A14B]" />
            </div>
            <div>
              <h2
                className="text-xl font-medium text-[#222] dark:text-[#F5F0E8]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Artist Profile
              </h2>
              <p className="text-xs text-[#6F6F6F]">How your name and bio appear on gallery creations</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-xs font-semibold text-[#6F6F6F] uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/4 dark:bg-white/5 border border-[#C8A14B]/20 text-sm outline-none focus:border-[#C8A14B] transition-colors text-[#222] dark:text-[#F5F0E8]"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-xs font-semibold text-[#6F6F6F] uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/4 dark:bg-white/5 border border-[#C8A14B]/20 text-sm outline-none focus:border-[#C8A14B] transition-colors text-[#222] dark:text-[#F5F0E8]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6F6F6F] uppercase tracking-wider mb-2">
              Artist Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-black/4 dark:bg-white/5 border border-[#C8A14B]/20 text-sm outline-none focus:border-[#C8A14B] transition-colors text-[#222] dark:text-[#F5F0E8] resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Generation Defaults */}
        <div className="rounded-3xl border border-[#C8A14B]/20 bg-white/70 dark:bg-[#1A1814]/85 backdrop-blur-xl p-6 lg:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#C8A14B]/14">
            <div className="w-9 h-9 rounded-xl bg-[#C8A14B]/10 flex items-center justify-center">
              <Sliders size={16} className="text-[#C8A14B]" />
            </div>
            <div>
              <h2
                className="text-xl font-medium text-[#222] dark:text-[#F5F0E8]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                AI Generation Defaults
              </h2>
              <p className="text-xs text-[#6F6F6F]">
                Preset era, style, and ratio options when opening Studio
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-6">
            <div>
              <label className="block text-xs font-semibold text-[#6F6F6F] uppercase tracking-wider mb-2">
                Default Era
              </label>
              <select
                value={defaultEra}
                onChange={(e) => setDefaultEra(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/4 dark:bg-white/5 border border-[#C8A14B]/20 text-sm outline-none focus:border-[#C8A14B] transition-colors text-[#222] dark:text-[#F5F0E8] cursor-pointer"
              >
                {["Akbar (1556–1605)", "Jahangir (1605–1627)", "Shah Jahan (1627–1658)", "Aurangzeb (1658–1707)"].map(
                  (e) => <option key={e}>{e}</option>
                )}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6F6F6F] uppercase tracking-wider mb-2">
                Default Style
              </label>
              <select
                value={defaultStyle}
                onChange={(e) => setDefaultStyle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/4 dark:bg-white/5 border border-[#C8A14B]/20 text-sm outline-none focus:border-[#C8A14B] transition-colors text-[#222] dark:text-[#F5F0E8] cursor-pointer"
              >
                {["Court Scene", "Portrait", "Battle", "Hunt", "Nature Study", "Architecture"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6F6F6F] uppercase tracking-wider mb-2">
                Aspect Ratio
              </label>
              <select
                value={defaultRatio}
                onChange={(e) => setDefaultRatio(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/4 dark:bg-white/5 border border-[#C8A14B]/20 text-sm outline-none focus:border-[#C8A14B] transition-colors text-[#222] dark:text-[#F5F0E8] cursor-pointer"
              >
                {["4:3", "3:4", "1:1", "16:9", "9:16"].map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            {[
              {
                state: highResUpscale,
                toggle: () => setHighResUpscale(!highResUpscale),
                title: "High-Resolution 4K Royal Upscaling",
                desc: "Generate fine gold-leaf border details and brushstroke hatching",
              },
            ].map(({ state, toggle, title, desc }) => (
              <div
                key={title}
                className="flex items-center justify-between p-4 rounded-xl bg-black/4 dark:bg-white/5 border border-[#C8A14B]/10"
              >
                <div>
                  <div className="text-sm font-medium text-[#222] dark:text-[#F5F0E8]">{title}</div>
                  <div className="text-xs text-[#6F6F6F]">{desc}</div>
                </div>
                <button
                  onClick={toggle}
                  className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                    state ? "bg-[#C8A14B]" : "bg-black/20 dark:bg-white/20"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      state ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Membership & Credits */}
        <div className="rounded-3xl border border-[#C8A14B]/20 bg-white/70 dark:bg-[#1A1814]/85 backdrop-blur-xl p-6 lg:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#C8A14B]/14">
            <div className="w-9 h-9 rounded-xl bg-[#C8A14B]/10 flex items-center justify-center">
              <CreditCard size={16} className="text-[#C8A14B]" />
            </div>
            <div>
              <h2
                className="text-xl font-medium text-[#222] dark:text-[#F5F0E8]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Atelier Membership &amp; Credits
              </h2>
              <p className="text-xs text-[#6F6F6F]">Your PRO membership status and remaining usage quota</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#C8A14B]/14 to-[#6A2332]/10 border border-[#C8A14B]/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#C8A14B] text-white flex items-center justify-center shadow-md">
                <Crown size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-[#222] dark:text-[#F5F0E8]">
                    Mughal Atelier PRO Plan
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#C8A14B] text-white text-[10px] font-bold">
                    ACTIVE
                  </span>
                </div>
                <p className="text-xs text-[#6F6F6F]">
                  89,400 / 100,000 royal generation credits available this billing cycle
                </p>
              </div>
            </div>
            <button className="px-5 py-2 rounded-full border border-[#C8A14B]/40 text-xs font-semibold text-[#C8A14B] hover:bg-[#C8A14B] hover:text-white transition-all">
              Manage Subscription
            </button>
          </div>
        </div>

        {/* Appearance & Sound */}
        <div className="rounded-3xl border border-[#C8A14B]/20 bg-white/70 dark:bg-[#1A1814]/85 backdrop-blur-xl p-6 lg:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#C8A14B]/14">
            <div className="w-9 h-9 rounded-xl bg-[#C8A14B]/10 flex items-center justify-center">
              {theme === "light" ? <Sun size={16} className="text-[#C8A14B]" /> : <Moon size={16} className="text-[#C8A14B]" />}
            </div>
            <div>
              <h2
                className="text-xl font-medium text-[#222] dark:text-[#F5F0E8]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Appearance &amp; Theme
              </h2>
              <p className="text-xs text-[#6F6F6F]">Customize your visual workspace and theme preferences</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div
              onClick={toggleTheme}
              className="p-4 rounded-2xl border border-[#C8A14B]/15 bg-black/4 dark:bg-white/5 flex items-center justify-between cursor-pointer hover:border-[#C8A14B]/40 transition-all"
            >
              <div>
                <div className="text-sm font-medium text-[#222] dark:text-[#F5F0E8]">
                  Atelier Theme ({theme === "light" ? "Light Mode" : "Dark Mode"})
                </div>
                <div className="text-xs text-[#6F6F6F]">Click to switch between ivory and obsidian court modes</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#C8A14B]/15 flex items-center justify-center text-[#C8A14B]">
                {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
