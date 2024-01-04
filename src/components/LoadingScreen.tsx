import { Box } from "@mui/material";

import { Icon } from '@iconify/react';

type Props = {
  isMainPage?: boolean;
};

export default function LoadingScreen({ isMainPage }: Props) {
    return (
      <>
        {!isMainPage && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: '#fff', zIndex: 100 }}>
              <Icon icon="eos-icons:three-dots-loading" fontSize='100px' />
          </Box>
        )}
      </>
    )
}
