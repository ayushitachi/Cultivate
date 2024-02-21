import React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import { string } from "zod";

function Room() {
  const { id } = useParams();
  const { user } = useUserContext();
  console.log(id);
  console.log(user);

  const modeGiven: any = "OneONoneCall";

  let myMeeting = async (element: any) => {
    const kitToken = await ZegoUIKitPrebuilt.generateKitTokenForTest(
      import.meta.env.VITE_ZEGO_APPID,
      import.meta.env.VITE_ZEGO_SERVERID,
      id!,
      user?.id,
      user?.username
    );
    // Create instance object from Kit Token.
    console.log();
    const zp: any = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,

      turnOnMicrophoneWhenJoining: false,
      turnOnCameraWhenJoining: false,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: false,
      showTextChat: true,
      showUserList: false,
      maxUsers: 2,
      layout: "Auto",
      showLayoutButton: false,
      scenario: {
        mode: modeGiven,
      },
    });
  };

  return (
    <div>
      <div ref={myMeeting} />
    </div>
  );
}

export default Room;
