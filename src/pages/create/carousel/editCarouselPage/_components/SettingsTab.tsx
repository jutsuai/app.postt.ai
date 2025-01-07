import { Textarea } from "@/components/ui/textarea";

export default function SettingsTab({
  // createdBy,
  // setCreatedBy,

  commentary,
  setCommentary,
}) {
  // const [avatarEnabled, setAvatarEnabled] = useState(true);
  // const [avatarUrl, setAvatarUrl] = useState("");
  // const [avatarNameEnabled, setAvatarNameEnabled] = useState(true);
  // const [avatarName, setAvatarName] = useState("");
  // const [avatarUserNameEnabled, setAvatarUserNameEnabled] = useState(true);
  // const [avatarUserName, setAvatarUserName] = useState("");

  return (
    <div className="space-y-6 bg-muted border shadow-md p-4 rounded-lg h-full">
      <h3 className="text-base font-semibold">Settings</h3>
      {/* <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Headshot</span>
          <Switch checked={avatarEnabled} onCheckedChange={setAvatarEnabled} />
        </div>
        {avatarEnabled && (
          <UploadTool
            // label="Background Image"
            value={avatarUrl}
            onChange={setAvatarUrl}
            placeholder="https://via.placeholder.com/40"
          />
        )}
      </div> */}

      {/* <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Name</span>
          <Switch
            checked={avatarNameEnabled}
            onCheckedChange={setAvatarNameEnabled}
          />
        </div>
        <Input
          type="text"
          value={createdBy.name}
          onChange={(e) => setCreatedBy({ ...createdBy, name: e.target.value })}
          placeholder="Test User"
          className="bg-background"
          disabled={!avatarNameEnabled}
        />
      </div> */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Commentary</span>
          {/* <Switch
            checked={avatarUserNameEnabled}
            onCheckedChange={setAvatarUserNameEnabled}
          /> */}
        </div>
        <Textarea
          // disabled={!customizations?.description?.visible}
          // value={slides[selectedSlide].description}
          // onChange={(e) => {
          //   const newSlides = [...slides];
          //   newSlides[selectedSlide] = {
          //     ...newSlides[selectedSlide],
          //     description: e.target.value,
          //   };
          //   setSlides(newSlides);
          // }}
          value={commentary}
          onChange={(e) => setCommentary(e.target.value)}
          rows={4}
          className="bg-background"
        />
      </div>

      {/* <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">LinkedIn Handle</span>
          <Switch
            checked={avatarUserNameEnabled}
            onCheckedChange={setAvatarUserNameEnabled}
          />
        </div>
        <Input
          type="text"
          value={createdBy.username}
          onChange={(e) =>
            setCreatedBy({ ...createdBy, username: e.target.value })
          }
          placeholder="test"
          className="bg-background"
          disabled={!avatarUserNameEnabled}
        />
      </div> */}
    </div>
  );
}
