import PropTypes from 'prop-types';
import { Stack, Fade, Typography } from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import React, { useEffect, useState } from 'react';
import { getRandomInt } from '../../services/ExerciseServiceHelper';
import { FacebookIcon, FacebookShareButton, LineIcon, LineShareButton } from 'react-share';
import { URL } from '../../routes/RouteConstants';

// https://home-fitness.netlify.app/session
const url = `${window.location.origin}${URL.SESSION_URL}`;

function ExerciseComplete({
  exerciseDurationInSecond,
}) {
  const [imgUrl, setImgUrl] = useState(null);

  const getRandomImage = async () => {
    const random = getRandomInt(1, 11);
    const imageUrl = await import(`../../assets/images/quotes/${random}.jpeg`);
    setImgUrl(imageUrl.default);
  };

  
  
  useEffect(() => {
    getRandomImage();
  }, []);

  return (
    <Fade in>
      <Stack flexDirection='column' alignItems='center' sx={{ width: '100%', height: '50vh' }}>
        <Typography variant='h4' gutterBottom><LocalFireDepartmentIcon sx={{ fill: 'orange' }} /> Congratulations <LocalFireDepartmentIcon sx={{ fill: 'orange' }} /></Typography>
        <Typography>You have finished {exerciseDurationInSecond / 60} minute exercise</Typography>

        <br />

        {imgUrl && (
          <img
            src={imgUrl}
            srcSet={imgUrl}
            alt={imgUrl}
            loading='lazy'
            style={{
              width: '400px',
              maxWidth: '70vw',
              maxHeight: '400px'
            }}
          />
        )}
        <br />
        <Typography>Share to my success</Typography>
        <Stack flexDirection='row' alignItems='center' gap={2}>
          <FacebookShareButton
            url={url}
          >
            <FacebookIcon size={48} round />
          </FacebookShareButton>

          <LineShareButton url={url}>
            <LineIcon size={48} round />
          </LineShareButton>
        </Stack>
      </Stack>
    </Fade>
  );
}

ExerciseComplete.propTypes = {
  exerciseDurationInSecond: PropTypes.number.isRequired,
};
export default ExerciseComplete;
