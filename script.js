// تفاعل: pausa/resume عبر النقر أو الكيبورد، واحترام prefers-reduced-motion
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scenes = Array.from(document.querySelectorAll('.scene'));

  scenes.forEach(scene => {
    const shape = scene.querySelector('.cube, .pyramid, .sphere, .cylinder');
    if (shape && !shape.classList.contains('shape-rotator')) {
      const rot = document.createElement('div');
      rot.className = 'shape-rotator';
      shape.parentNode.insertBefore(rot, shape);
      rot.appendChild(shape);
    }

    scene.setAttribute('tabindex', '0');

    if (!reduceMotion) {
      scene.setAttribute('aria-label', scene.getAttribute('aria-label') || 'مشهد أشكال ثلاثية الأبعاد — اضغط للتشغيل/الإيقاف');
      const togglePause = () => scene.classList.toggle('paused');

      scene.addEventListener('click', togglePause);
      scene.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'Enter') {
          e.preventDefault();
          togglePause();
        }
      });

      // pause on pointer enter for inspection, resume on leave
      scene.addEventListener('pointerenter', () => scene.classList.add('paused'));
      scene.addEventListener('pointerleave', () => scene.classList.remove('paused'));
    } else {
      // إذا المستخدم طلب تقليل الحركة، نخلي الأنيميشن متوقفة
      scene.classList.add('paused');
    }
  });
});
