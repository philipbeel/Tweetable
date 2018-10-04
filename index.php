<?php
require "twitter/autoload.php";
$CONSUMER_KEY='Your Consumer key';
$CONSUMER_SECRET='Your Consumer Secret';
$accessToken='Your access Token';
$accessTokenSecret='Your Secret access Token';
$id=$_GET['screen_name'];
$limit=$_GET['limit'];
use Abraham\TwitterOAuth\TwitterOAuth;
$connection = new TwitterOAuth($CONSUMER_KEY, $CONSUMER_SECRET, $accessToken, $accessTokenSecret);
$twitterData = $connection->get(
          'statuses/home_timeline',
          array(
              'screen_name'     => $id,
              'count'           => $limit
          )
      );
$tweets=array();
$i=0;
 if(!empty($twitterData)){
  foreach($twitterData as $tweet){
    if (!empty($tweet->id))
    {
      $tweets[$i]['tweet_date']=date("YM d H:i:sTZY",strtotime($tweet->created_at));
      $tweets[$i]['response']=$tweet->text;
      $i++;
    }
  }
  }
$result['tweets']=$tweets;
echo json_encode($result);
?>
