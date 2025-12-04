// Map tea names/slugs to local image files
export function getTeaImage(teaName: string, slug?: string): string | null {
  // Normalize the tea name for matching
  const normalizedName = teaName.toLowerCase().trim();

  // Map tea names to image files
  const imageMap: Record<string, string> = {
    "longjing tea": "/longjing.jpg",
    longjing: "/longjing.jpg",
    "anji bai cha": "/anji baicha.jpg",
    "anji baicha": "/anji baicha.jpg",
    "wu niu zao longjing": "/wuniuzaoLongjing.jpg",
    "wuniuzao longjing": "/wuniuzaoLongjing.jpg",
    "wu niu zao": "/wuniuzaoLongjing.jpg",
    "tie guan yin": "/tieGuanYin.jpg",
    tieguanyin: "/tieGuanYin.jpg",
  };

  // Try to find by exact name match
  if (imageMap[normalizedName]) {
    return imageMap[normalizedName];
  }

  // Try to find by partial match
  for (const [key, value] of Object.entries(imageMap)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return value;
    }
  }

  // Try to match by slug if provided
  if (slug) {
    const normalizedSlug = slug.toLowerCase().trim();
    if (
      normalizedSlug.includes("longjing") &&
      !normalizedSlug.includes("wuniuzao")
    ) {
      return "/longjing.jpg";
    }
    if (normalizedSlug.includes("anji") || normalizedSlug.includes("baicha")) {
      return "/anji baicha.jpg";
    }
    if (
      normalizedSlug.includes("wuniuzao") ||
      normalizedSlug.includes("wu-niu-zao")
    ) {
      return "/wuniuzaoLongjing.jpg";
    }
    if (
      normalizedSlug.includes("tie") ||
      normalizedSlug.includes("guan") ||
      normalizedSlug.includes("yin")
    ) {
      return "/tieGuanYin.jpg";
    }
  }

  return null;
}
