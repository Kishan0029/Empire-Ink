import { useState, useEffect, useCallback } from "react";
import { settingsService, profileService } from "../api";

export function useSettings() {
  const [name, setName] = useState("Kishan");
  const [handle, setHandle] = useState("@kishan");
  const [email, setEmail] = useState("kishan@empireandink.art");
  const [bio, setBio] = useState(
    "Passionate about 17th-century Mughal miniature art, imperial durbars, and historical color palettes. Creating museum-grade AI miniatures in the tradition of Ustad Mansur."
  );

  const [defaultEra, setDefaultEra] = useState("Jahangir (1605–1627)");
  const [defaultStyle, setDefaultStyle] = useState("Court Scene");
  const [defaultRatio, setDefaultRatio] = useState("4:3");
  const [autoEnhance, setAutoEnhance] = useState(true);
  const [highResUpscale, setHighResUpscale] = useState(true);
  const [soundEffects, setSoundEffects] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      setLoading(true);
      try {
        const [userProf, userSet] = await Promise.all([
          profileService.getProfile(),
          settingsService.getSettings(),
        ]);
        setName(userProf.name);
        setHandle(userProf.handle);
        setEmail(userProf.email);
        setBio(userProf.bio);

        setDefaultEra(userSet.defaultEra);
        setDefaultStyle(userSet.defaultStyle);
        setDefaultRatio(userSet.defaultRatio);
        setAutoEnhance(userSet.autoEnhance);
        setHighResUpscale(userSet.highResUpscale);
        setSoundEffects(userSet.soundEffects);
      } catch (e) {
        console.error("Failed to load settings:", e);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = useCallback(async () => {
    try {
      await Promise.all([
        profileService.updateProfile({ name, handle, email, bio }),
        settingsService.updateSettings({
          defaultEra,
          defaultStyle,
          defaultRatio,
          autoEnhance,
          highResUpscale,
          soundEffects,
        }),
      ]);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      console.error("Failed to save settings:", e);
    }
  }, [name, handle, email, bio, defaultEra, defaultStyle, defaultRatio, autoEnhance, highResUpscale, soundEffects]);

  return {
    name,
    setName,
    handle,
    setHandle,
    email,
    setEmail,
    bio,
    setBio,
    defaultEra,
    setDefaultEra,
    defaultStyle,
    setDefaultStyle,
    defaultRatio,
    setDefaultRatio,
    autoEnhance,
    setAutoEnhance,
    highResUpscale,
    setHighResUpscale,
    soundEffects,
    setSoundEffects,
    saved,
    handleSave,
    loading,
  };
}
