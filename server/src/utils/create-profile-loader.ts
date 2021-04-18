import DataLoader from "dataloader";
import { Profile } from "../entities/profile";

// [1, 78, 8, 9]
// [{id: 1, firstName: 'tim'}, {}, {}, {}]
export const createProfileLoader = (): DataLoader<number, Profile> =>
  new DataLoader<number, Profile>(async (profileIds) => {
    const profiles = await Profile.findByIds(profileIds as number[]);
    const profileIdToProfile: Record<number, Profile> = {};
    profiles.forEach((p) => {
      profileIdToProfile[p.id] = p;
    });

    const sortedProfiles = profileIds.map(
      (profileId) => profileIdToProfile[profileId]
    );
    return sortedProfiles;
  });
