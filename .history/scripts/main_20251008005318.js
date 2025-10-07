// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed

$(document).ready(function() {
  AOS.init( {
    // uncomment below for on-scroll animations to played only once
    // once: true  
  }); // initialize animate on scroll library
});

// Smooth scroll for links with hashes
$('a.smooth-scroll')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });
    }
  }
});


// Sample certificate data (replace with your actual certificate data)
const certificates = [
  { name: "Az-900", description: "Azure Fundamentals", imageUrl: "images/cert/az_fun.png" },
  { name: "Az-204", description: "Azure Developer associate", imageUrl: "images/cert/az_dev.png" },
  { name: "Az-500", description: "Azure security engineer associate", imageUrl: "images/cert/Az_security.png" },
  { name: "Accuknox", description: "Accuknox security awareness", imageUrl: "images/cert/accuknox_sec.png" },
  { name: "Transcript", description: "Azure all certificates", imageUrl: "images/cert/Az_devops.png" },
  // Add more certificate objects as needed
];

let displayedCertificates = 4; // Initial number of certificates displayed

// Function to load certificates
function loadCertificates(startIndex, count) {
  const certificateGallery = document.getElementById('certificate-gallery');
  // Clear previous certificates
  certificateGallery.innerHTML = '';
  // Loop through the certificates to be loaded
  for (let i = startIndex; i < startIndex + count && i < certificates.length; i += 2) {
    const certificate1 = certificates[i];
    const certificate2 = certificates[i + 1];
    const row = document.createElement('div');
    row.className = 'row';
    if (certificate1) {
      const certificateHtml1 = `
        <div class="col-md-6">
          <div class="cc-porfolio-image img-raised" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
            <a href="#certificate${i + 1}">
              <figure class="cc-effect"><img src="${certificate1.imageUrl}" alt="Certificate Image"/>
                <figcaption>
                  <div class="h4">${certificate1.name}</div>
                  <p>${certificate1.description}</p>
                </figcaption>
              </figure>
            </a>
          </div>
        </div>
      `;
      row.innerHTML += certificateHtml1;
    }
    if (certificate2) {
      const certificateHtml2 = `
        <div class="col-md-6">
          <div class="cc-porfolio-image img-raised" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
            <a href="#certificate${i + 2}">
              <figure class="cc-effect"><img src="${certificate2.imageUrl}" alt="Certificate Image"/>
                <figcaption>
                  <div class="h4">${certificate2.name}</div>
                  <p>${certificate2.description}</p>
                </figcaption>
              </figure>
            </a>
          </div>
        </div>
      `;
      row.innerHTML += certificateHtml2;
    }
    certificateGallery.appendChild(row);
  }
}


// Load initial certificates
loadCertificates(0, displayedCertificates);

// Event listener for "Load More" button
document.getElementById('load-more-btn').addEventListener('click', function() {
  displayedCertificates += 4;
  loadCertificates(0, displayedCertificates); // Reload all certificates
  document.getElementById('load-more-btn').style.display = 'none'; // Hide Load More button
  document.getElementById('load-less-btn').style.display = 'inline-block'; // Show Load Less button
});

// Event listener for "Load Less" button
document.getElementById('load-less-btn').addEventListener('click', function() {
  displayedCertificates = 4; // Reset to initial count
  loadCertificates(0, displayedCertificates); // Reload initial certificates
  document.getElementById('load-more-btn').style.display = 'inline-block'; // Show Load More button
  document.getElementById('load-less-btn').style.display = 'none'; // Hide Load Less button
});

