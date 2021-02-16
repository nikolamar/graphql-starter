import { StarIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import { FC, useState } from "react";

interface RateProps {
  defaultValue?: number;
  readonly?: boolean;
}

export const Rate: FC<RateProps> = ({ defaultValue = 0, readonly = false }) => {

  // To set the default Star Selected
  const [defaultRating, setDefaultRating] = useState(defaultValue);
  // To set the max number of Stars
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  return (
    <Box>
      {maxRating.map((item, key) => {
        return (
          <StarIcon
            key={item}
            width={3}
            height={3}
            color={item <= defaultRating ? "yellow.300" : "grey.100"}
            disabled={readonly}
            onClick={() => !readonly && setDefaultRating(item)}
            aria-label="Rate hotel"
          />
        );
      })}
    </Box>
  );
}