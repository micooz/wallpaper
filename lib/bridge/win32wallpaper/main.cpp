#include <algorithm>
#include <iostream>
#include <Windows.h>
#include "Wallpaper.h"

WallpaperStyle GetWallpaperStyle(const char* stylestr)
{
  WallpaperStyle style = Stretch;
  if (strcmp(stylestr, "Tile") == 0)
  {
    style = Tile;
  }
  else if (strcmp(stylestr, "Center") == 0)
  {
    style = Center;
  }
  else if (strcmp(stylestr, "Stretch") == 0)
  {
    style = Stretch;
  }
  else if (strcmp(stylestr, "Fit") == 0)
  {
    style = Fit;
  }
  else if (strcmp(stylestr, "Fill") == 0)
  {
    style = Fill;
  }
  return style;
}

/*
 *
 * ..> wallpaper.exe file style
 * Returns:
 *    0  - success
 *   -1  - invalid parameters
 *   -2  - doesn\'t support JPG file
 *   -3  - doesn\'t support Fit or Fill style
 *   -4  - set wallpaper failed
 */
int main(int argc, const char*argv[]){
  if (argc != 3) {
    std::cout << "Usage:\n\twallpaper file <Tile, Center, Stretch, Fit, Fill>" << std::endl;
    return -1;
  }
  const char* file = argv[1];
  const char* stylestr = argv[2];

  // Get file path
  // Convert const char* to WCHAR*
  int dwLen = strlen(file) + 1;
  int nwLen = MultiByteToWideChar(CP_ACP, 0, file, dwLen, NULL, 0);
  PWSTR pszFile = new WCHAR[dwLen];
  MultiByteToWideChar(CP_ACP, 0, file, dwLen, pszFile, nwLen);

  // Check JPG support
  std::string ext = std::strrchr(file, '.');
  std::transform(ext.begin(), ext.end(), ext.begin(), ::tolower);
  if (ext == ".jpg"){
    if (!SupportJpgAsWallpaper()) {
      return -2;
    }
  }

  // Get WallpaperStyle
  WallpaperStyle style = GetWallpaperStyle(stylestr);

  // Check Fit Fill styles support
  if (style == Fit || style == Fill){
    if (!SupportFitFillWallpaperStyles()){
      return -3;
    }
  }

  // Set Wallpaper
  HRESULT hr = SetDesktopWallpaper(pszFile, style);
  if (SUCCEEDED(hr)) {
    return 0;
  }
  return -4;
}