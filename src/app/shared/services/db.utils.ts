export function checkOnProfileLists<FilmData>(snaps, watchlist, seen, ignore) {
  return snaps.map((snap) => {
    return <FilmData>{
      seen: seen.value?.some((val) => val.id === snap.id),
      watchlist: watchlist.value?.some((val) => val.id === snap.id),
      ignore: ignore.value?.some((val) => val.id === snap.id),
      myRating: seen.value?.some((val) => val.id === snap.id)
        ? seen.value.find((val) => val.id === snap.id).myRating
        : null,
      ...snap,
    };
  });
}

export function convertMovieDetail<FilmData>(snap, watchlist, seen) {
  return <FilmData>{
    seen: seen.value?.some((val) => val.id === snap.id),
    watchlist: watchlist.value?.some((val) => val.id === snap.id),
    myRating: seen.value?.some((val) => val.id === snap.id)
      ? seen.value.find((val) => val.id === snap.id).myRating
      : null,
    timeAdded: watchlist.value?.some((val) => val.id === snap.id)
      ? watchlist.value.find((val) => val.id === snap.id).timeAdded
      : null,
    timeSeen: seen.value?.some((val) => val.id === snap.id)
      ? seen.value.find((val) => val.id === snap.id).timeSeen
      : null,
    ...snap,
  };
}

export function convertSnaps<FilmData>(snaps) {
  return snaps.map((snap) => {
    return <FilmData>snap.payload.doc.data();
  });
}
