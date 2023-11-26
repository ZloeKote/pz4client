function QuestionShow({ question, index, type }) {
  let frame;
  let description = null;
  if (type === "Tournament - Video" || type === "TOURNAMENT_VIDEO") {
    if (question.qYTLink) {
      frame = (
        <iframe
          title="Youtube"
          width={500}
          height={281}
          allowFullScreen
          src={toValidIframeYTLink(`${question.qYTLink}`)}
        ></iframe>
      );
    } else if (question.QYTLink) {
      frame = (
        <iframe
          title="Youtube"
          width={500}
          height={281}
          allowFullScreen
          src={toValidIframeYTLink(`${question.QYTLink}`)}
        ></iframe>
      );
    }
  } else if (type === "Tournament - Picture" || type === "TOURNAMENT_PICTURE") {
    if (question.qLink) {
      frame = <img src={`${question.qLink}`} />;
    } else {
      frame = <img src={`${question.QLink}`} />;
    }
  }

  if (typeof frame === "undefined") {
    frame = <a className="question-link" href={`${question.qLink || question.QLink || question.qYTLink || question.QYTLink}`} target="_blank" rel="noreferrer">link</a>;
  }

  description = question.qInfo ? question.qInfo.qDescription : question.QInfo.QDescription;

  return (
    <tr>
      <td className="question-no">{index}</td>
      <td className="question-question">{frame}</td>
      <td className="question-title">{question.qInfo ? question.qInfo.qTitle : question.QInfo.QTitle}</td>
      {description != null && <td className="question-description">{description}</td>}
      <td className="question-won">{question.wonTimes}</td>
    </tr>
  );
}

function toValidIframeYTLink(ytLink) {
  const curYTLink = ytLink;
  const YT_id_time = getId(curYTLink);
  const YTid = YT_id_time.videoId;
  if (YTid === "error") {
    return;
  }

  if (YT_id_time.timeVideo) ytLink = "//www.youtube.com/embed/" + YTid + "?t=" + YT_id_time.timeVideo;
  else ytLink = "//www.youtube.com/embed/" + YTid;
  return ytLink;
}

// Get youtube video's id
function getId(url) {
  let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  let match = url.match(regExp);
  let timeVideo;

  if (match && match[2].length === 11 && match[0].indexOf("t=") !== -1) {
    timeVideo = match[0].split("t=")[1];
    return {
      videoId: match[2],
      timeVideo,
    };
  } else if (match && match[2].length === 11) {
    return {
      videoId: match[2],
      timeVideo: null,
    };
  } else {
    return "error";
  }
}
export default QuestionShow;
