// ------------------------------------------------------- //
/*      投稿フェードイン機能                                  */
// ------------------------------------------------------- //

export const fadeInObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeInObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);
