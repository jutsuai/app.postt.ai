import Image from "@/components/Image";

export default function PreviewSection({
  backgroundImageUrl,
  titleText,
  titlePosition,
  titleEnabled,
  subtitleText,
  subtitlePosition,
  subtitleEnabled,
  avatarUrl,
  avatarName,
  avatarEnabled,
  avatarNameEnabled,
  avatarUserName,
  avatarUserNameEnabled,
}: {
  backgroundImageUrl: string;
  titleText: string;
  titlePosition: string;
  titleEnabled: boolean;
  subtitleText: string;
  subtitlePosition: string;
  subtitleEnabled: boolean;
  avatarUrl: string;
  avatarName: string;
  avatarEnabled: boolean;
  avatarNameEnabled: boolean;
  avatarUserName: string;
  avatarUserNameEnabled: boolean;
}) {
  return (
    <div className="p-3 bg-muted shadow-md border w-full h-full rounded-xl">
      <div
        className="h-full w-full flex justify-between flex-col rounded-lg p-6 relative"
        style={{
          backgroundImage: backgroundImageUrl
            ? `url(${backgroundImageUrl})`
            : `url(https://ipfs.near.social/ipfs/bafkreihasoknfohlxfcngttgfevlluyrgwoapozojske3cc6yabozoajoe)`,
          backgroundSize: "cover",
          backgroundPosition: "center",

          aspectRatio: "1 / 1.25",
        }}
      >
        <div className="z-10 space-y-2 mt-32">
          {titleEnabled && (
            <h1
              className="text-3xl text-white font-bold leading-tight"
              style={{ textAlign: titlePosition }}
            >
              {titleText}
            </h1>
          )}
          {subtitleEnabled && (
            <p
              className="text-white/80 font-medium text-sm max-w-xs"
              style={{ textAlign: subtitlePosition }}
            >
              {subtitleText}
            </p>
          )}
        </div>

        <div className="flex items-center z-10 space-x-2 h-11">
          {avatarEnabled && (
            <Image
              src={avatarUrl}
              alt={avatarName}
              className="w-12 h-12 rounded-full"
            />
          )}
          <div className="text-sm">
            {avatarNameEnabled && (
              <div className="font-bold text-white  ">{avatarName}</div>
            )}
            {avatarUserNameEnabled && (
              <div className="text-white/80 text-xs">@{avatarUserName}</div>
            )}
          </div>
        </div>
        {/* <div className="absolute z-0 inset-0 bg-white bg-opacity-50 pointer-events-none rounded-md" /> */}
      </div>
    </div>
  );
}
