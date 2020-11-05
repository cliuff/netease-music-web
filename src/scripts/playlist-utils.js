export function processPlaylists(playlists) {
  let otherPlaylists = [];
  let playlistLike = playlists.filter(function(value) {
    let isLike = value.playlistName === "nemu-playlist-like";
    if (isLike) value.playlistName = "我喜欢的音乐";
    else otherPlaylists.push(value);
    return isLike;
  })[0];
  // 将喜欢的音乐移动到顶部
  let index = playlists.indexOf(playlistLike);
  if (index > -1) playlists.splice(index, 1);
  playlists.unshift(playlistLike);
  return {
    like: playlistLike,
    others: otherPlaylists
  };
}
