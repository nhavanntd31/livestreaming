export const effectsList = [
  {
    id: "ar_games",
    label: "AR Games",
    categories: [
      {
        id: "flappy_plane",
        label: "Flappy Plane",
        effects: [{ name: "FlappyPlane_mouth.zip", label: "Flappy Plane" }]
      },
      {
        id: "what_animal_are_you", 
        label: "What Animal Are You",
        effects: [{ name: "What_Animal_Are_You.zip", control: "game", label: "What Animal Are You" }]
      }
    ]
  },
  {
    id: "avatar",
    label: "Avatar", 
    categories: [
      {
        id: "hades",
        label: "Hades",
        effects: [{ name: "Hades.zip", label: "Hades" }]
      }
    ]
  },
  {
    id: "beauty_touch_up",
    label: "Beauty Touch UP",
    categories: [
      {
        id: "facemorphing",
        label: "Face morphing",
        effects: [
          {
            name: "Morphings_1.7.0.zip",
            label: "Face Narrowing",
            control: "slider",
            params: ["FaceMorph.face"],
            arg: "narrowing",
            direction: 1,
            icon: "/u/assets/icons/effects/face_narrowing.svg"
          },
          {
            name: "Morphings_1.7.0.zip",
            label: "V Shape",
            control: "slider",
            params: ["FaceMorph.face"],
            arg: "v_shape",
            direction: 1,
            icon: "/u/assets/icons/effects/face_v_shape.svg"
          },
          {
            name: "Morphings_1.7.0.zip",
            label: "Cheekbones Narrowing",
            control: "slider",
            params: ["FaceMorph.face"],
            arg: "cheekbones_narrowing",
            direction: 1,
            icon: "/u/assets/icons/effects/face_cheekbones_narrowing.svg"
          },
          {
            name: "Morphings_1.7.0.zip",
            label: "Cheeks Narrowing",
            control: "slider",
            params: ["FaceMorph.face"],
            arg: "cheeks_narrowing",
            direction: 1,
            icon: "/u/assets/icons/effects/face_cheeks_narrowing.svg"
          },
          {
            name: "Morphings_1.7.0.zip",
            label: "Jaw Narrowing",
            control: "slider",
            params: ["FaceMorph.face"],
            arg: "jaw_narrowing",
            direction: 1,
            icon: "/u/assets/icons/effects/face_jaw_narrowing.svg"
          },
          {
            name: "Morphings_1.7.0.zip",
            label: "Chin Shortening",
            control: "slider",
            params: ["FaceMorph.face"],
            arg: "chin_shortening",
            direction: 1,
            icon: "/u/assets/icons/effects/face_chin_shortening.svg"
          },
          {
            name: "Morphings_1.7.0.zip",
            label: "Chin Narrowing",
            control: "slider",
            params: ["FaceMorph.face"],
            arg: "chin_narrowing",
            direction: 1,
            icon: "/u/assets/icons/effects/face_chin_narrowing.svg"
          },
          {
            name: "Morphings_1.7.0.zip",
            label: "Sunken Cheeks",
            control: "slider",
            params: ["FaceMorph.face"],
            arg: "sunken_cheeks",
            minValue: "0",
            direction: 1,
            icon: "/u/assets/icons/effects/face_sunken_cheeks.svg"
          },
          {
            name: "Morphings_1.7.0.zip",
            label: "Cheeks Jaw Narrowing",
            control: "slider",
            params: ["FaceMorph.face"],
            arg: "cheeks_jaw_narrowing",
            direction: 1,
            icon: "/u/assets/icons/effects/face_cheeks_jaw_narrowing.svg"
          }
        ]
      },
      {
        id: "nose",
        label: "Nose",
        effects: [
          {
            name: "Morphings_1.7.0.zip",
            label: "Nose Width",
            control: "slider",
            params: ["FaceMorph.nose"],
            arg: "width",
            direction: 1,
            icon: "/u/assets/icons/effects/nose_width.svg"
          },
          {
            name: "Morphings_1.7.0.zip",
            label: "Nose Length",
            control: "slider",
            params: ["FaceMorph.nose"],
            arg: "length",
            direction: 1,
            icon: "/u/assets/icons/effects/nose_length.svg"
          },
          {
            name: "Morphings_1.7.0.zip",
            label: "Nose Tip Width",
            control: "slider",
            params: ["FaceMorph.nose"],
            arg: "tip_width",
            direction: -1,
            icon: "/u/assets/icons/effects/nose_tip_width.svg"
          }
        ]
      },
      {
        id: "eyes",
        label: "Eyes",
        effects: [
          {
            name: "Morphings_1.7.0.zip",
            label: "Eyes Rounding",
            control: "slider",
            params: ["FaceMorph.eyes"],
            arg: "rounding",
            minValue: "0",
            direction: 1,
            icon: "/u/assets/icons/effects/eyes_rounding.svg"
          },
          {
            name: "Morphings_1.7.0.zip",
            label: "Eyes Enlargement",
            control: "slider",
            params: ["FaceMorph.eyes"],
            arg: "enlargement",
            direction: 1,
            icon: "/u/assets/icons/effects/eyes_enlargement.svg"
          },
          {
            name: "Morphings_1.7.0.zip",
            label: "Eyes Height",
            control: "slider",
            params: ["FaceMorph.eyes"],
            arg: "height",
            direction: 1,
            icon: "/u/assets/icons/effects/eyes_height.svg"
          },
          {
            name: "Morphings_1.7.0.zip",
            label: "Eyes Spacing",
            control: "slider",
            params: ["FaceMorph.eyes"],
            arg: "spacing",
            direction: 1,
            icon: "/u/assets/icons/effects/eyes_spacing.svg"
          },
          {
            name: "Morphings_1.7.0.zip",
            label: "Eyes Squint",
            control: "slider",
            params: ["FaceMorph.eyes"],
            arg: "squint",
            direction: -1,
            icon: "/u/assets/icons/effects/eyes_squint.svg"
          },
          {
            name: "Morphings_1.7.0.zip",
            label: "Lower Eyelid Position",
            control: "slider",
            params: ["FaceMorph.eyes"],
            arg: "lower_eyelid_pos",
            direction: 1,
            icon: "/u/assets/icons/effects/eyes_lower_eyelid_pos.svg"
          },
          {
            name: "Morphings_1.7.0.zip",
            label: "Lower Eyelid Size",
            control: "slider",
            params: ["FaceMorph.eyes"],
            arg: "lower_eyelid_size",
            direction: -1,
            icon: "/u/assets/icons/effects/eyes_lower_eyelid_size.svg"
          }
        ]
      },
      {
        id: "eyebrows",
        label: "Eyebrows",
        effects: [
          {
            name: "Morphings_1.7.0.zip",
            label: "Eyebrows Spacing",
            control: "slider",
            params: ["FaceMorph.eyebrows"],
            arg: "spacing",
            direction: -1,
            icon: "/u/assets/icons/effects/eyebrows_spacing.svg"
          },
          {
            name: "Morphings_1.7.0.zip",
            label: "Eyebrows Height",
            control: "slider",
            params: ["FaceMorph.eyebrows"],
            arg: "height",
            direction: -1,
            icon: "/u/assets/icons/effects/eyebrows_height.svg"
          },
          {
            name: "Morphings_1.7.0.zip",
            label: "Eyebrows Bend",
            control: "slider",
            params: ["FaceMorph.eyebrows"],
            arg: "bend",
            direction: 1,
            icon: "/u/assets/icons/effects/eyebrows_bend.svg"
          }
        ]
      },
      {
        id: "lips",
        label: "Lips",
        effects: [
          {
            name: "Morphings_1.7.0.zip",
            label: "Lips Size",
            control: "slider",
            params: ["FaceMorph.lips"],
            direction: 1,
            arg: "size",
            icon: "/u/assets/icons/effects/lips_size.svg"
          },
          {
            name: "Morphings_1.7.0.zip",
            label: "Lips Height",
            control: "slider",
            params: ["FaceMorph.lips"],
            direction: 1,
            arg: "height",
            icon: "/u/assets/icons/effects/lips_height.svg"
          },
          {
            name: "Morphings_1.7.0.zip",
            label: "Lips Thickness",
            control: "slider",
            params: ["FaceMorph.lips"],
            direction: 1,
            arg: "thickness",
            icon: "/u/assets/icons/effects/lips_thickness.svg"
          },
          {
            name: "Morphings_1.7.0.zip",
            label: "Mouth Size",
            control: "slider",
            params: ["FaceMorph.lips"],
            direction: -1,
            arg: "mouth_size",
            icon: "/u/assets/icons/effects/lips_mouth_size.svg"
          },
          {
            name: "Morphings_1.7.0.zip",
            label: "Smile",
            control: "slider",
            params: ["FaceMorph.lips"],
            direction: 1,
            minValue: "0",
            arg: "smile",
            icon: "/u/assets/icons/effects/lips_smile.svg"
          },
          {
            name: "Morphings_1.7.0.zip",
            label: "Lips Shape",
            control: "slider",
            params: ["FaceMorph.lips"],
            direction: -1,
            arg: "shape",
            icon: "/u/assets/icons/effects/lips_shape.svg"
          }
        ]
      },
      {
        id: "skin",
        label: "Skin",
        effects: [
          {
            name: "SkinSoftening.zip",
            label: "Skin Softening",
            control: "slider",
            params: ["Skin.softening"],
            minValue: 0,
            direction: 1
          }
        ]
      },
      {
        id: "eye_whitening",
        label: "Eye Whitening",
        effects: [
          {
            name: "EyesWitening_Toggle.zip",
            label: "Eye Whitening",
            control: "toggle",
            params: ["onDataUpdate"]
          }
        ]
      },
      {
        id: "tooth_whitening",
        label: "Tooth Whitening",
        effects: [
          {
            name: "TeethWitening_Toggle.zip",
            label: "Tooth Whitening",
            control: "toggle",
            params: ["onDataUpdate"]
          }
        ]
      }
    ]
  },
  {
    id: "face_masks",
    label: "Face Masks",
    categories: [
      {
        id: "animation",
        label: "Animation",
        effects: [{ name: "Spider2.zip", label: "Spider" }]
      },
      {
        id: "foreground_effects",
        label: "Foreground effects",
        effects: [{ name: "Retrowave.zip", label: "Retrowave" }]
      },
      {
        id: "masks_morphing",
        label: "Masks with Morphing",
        effects: [{ name: "TrollGrandma.zip", label: "Troll Grandma" }]
      },
      {
        id: "multiple_face_detection",
        label: "Multiple Face Detection",
        effects: [{ name: "MinnieMouse7_multi.zip", label: "Minnie Mouse" }]
      },
      {
        id: "physics",
        label: "Physics",
        effects: [{ name: "ConfusedRabbit.zip", label: "Confused Rabbit" }]
      }
    ]
  },
 
  {
    id: "virtual_try_on",
    label: "Virtual Try On",
    categories: [
      {
        id: "glasses_try_on",
        label: "Glasses Try On",
        effects: [
          { name: "Eye_lenses_Blue.zip", label: "Blue Eye Lenses", icon: "/u/assets/icons/effects/Eye_lenses_Blue.png" },
          { name: "Eye_lenses_Green.zip", label: "Green Eye Lenses", icon: "/u/assets/icons/effects/Eye_lenses_Green.png" },
          { name: "glasses_RayBan4165_Dark.zip", label: "Dark RayBan Glasses", icon: "/u/assets/icons/effects/Glasses_Dark.png" }
        ]
      },
      {
        id: "hair",
        label: "Hair Coloring",
        effects: [
          { name: "VTO_Hair_blue.zip", label: "Blue Hair", icon: "/u/assets/icons/effects/VTO_Hair_blue.png" },
          { name: "VTO_Hair_green.zip", label: "Green Hair", icon: "/u/assets/icons/effects/VTO_Hair_green.png" },
          { name: "VTO_Hair_strand.zip", label: "Hair Strand", icon: "/u/assets/icons/effects/VTO_Hair_strand.png" }
        ]
      },
      {
        id: "head_wearings",
        label: "Head wearings",
        effects: [{ name: "VTO_Headdresse_01.zip", label: "Headdress" }]
      },
      {
        id: "jewelry",
        label: "Jewelry",
        effects: [
          { name: "earrings_01.zip", label: "Earrings", icon: "/u/assets/icons/effects/earrings_01.png" },
          { name: "necklace_01.zip", label: "Necklace", icon: "/u/assets/icons/effects/necklace_01.png" }
        ]
      },
      {
        id: "makeup",
        label: "Makeup",
        effects: [{ name: "Low_look_clubs.zip", label: "Club Look" }]
      }
    ]
  },
  {
    id: "voice",
    label: "Voice",
    categories: [
      {
        id: "voice_changer",
        label: "Voice Changer",
        effects: [
          {
            type: "voice",
            name: "voice_changer.zip",
            label: "Pitch",
            control: "slider",
            params: ["VoiceEffect.pitch"],
            arg: "pitch", 
            direction: 1,
            icon: "/u/assets/icons/effects/pitch.jpg"
          },
          {
            type: "voice",
            name: "voice_changer.zip",
            label: "Formant",
            control: "slider",
            params: ["VoiceEffect.formant"],
            arg: "formant",
            direction: 1,
            icon: "/u/assets/icons/effects/lips_shape.svg"
          },
          {
            type: "voice",
            name: "voice_changer.zip",
            label: "Reverb",
            control: "slider",
            params: ["VoiceEffect.reverb"], 
            arg: "reverb",
            minValue: "0",
            maxValue: "100",
            direction: 1,
            icon: "/u/assets/icons/effects/lips_shape.svg"
          },
          {
            type: "voice",
            name: "voice_changer.zip",
            label: "Delay",
            control: "slider",
            params: ["VoiceEffect.delay"],
            arg: "delay",
            minValue: "0",
            maxValue: "1000",
            direction: 1,
            icon: "/u/assets/icons/effects/lips_shape.svg"
          }
        ]
      }
    ]
  },
]
