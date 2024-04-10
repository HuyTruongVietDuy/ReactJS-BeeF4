import React, { useEffect, useState } from 'react';

function ScrollHandler() {
  const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);
  const headers = document.getElementsByClassName("user-container-header");
  const menuLinks = document.querySelectorAll(".user-container-header a");
  const viewportHeight = window.innerHeight;
  const scrollThreshold = viewportHeight * 0.8; // 80% của chiều cao viewport

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos > scrollThreshold && window.location.href === "http://localhost:3000/") {
        menuLinks.forEach(function(link) {
          link.style.color = "black";
        });

        for (let i = 0; i < headers.length; i++) {
          headers[i].style.backgroundColor = "";
        }

        document.querySelector('.user-logo-header img').src = process.env.PUBLIC_URL + "/images/SQBE Logo-black.png";
      } else {
        menuLinks.forEach(function(link) {
          link.style.color = "white";
        });

        for (let i = 0; i < headers.length; i++) {
          headers[i].style.backgroundColor = "#e6e4e400";
        }

        document.querySelector('.user-logo-header img').src = process.env.PUBLIC_URL + "/images/SQBE Logo-white.png";
      }

      setPrevScrollpos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollpos, headers, menuLinks, scrollThreshold]);

  return null;
}

export default ScrollHandler;
