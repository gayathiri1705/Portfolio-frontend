import React, { Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useInView } from 'react-intersection-observer';
import api from '@/lib/api';

const AnimatedSphere = () => {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.2}
      />
    </Sphere>
  );
};

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [aboutText, setAboutText] = useState("I’m Gayathiri, a developer and freelancer.\n\nI specialize in building dynamic and scalable web applications.");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data.about_text) {
          setAboutText(res.data.about_text);
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div ref={ref} className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
        <p className="text-xl text-muted-foreground">Get to know who I am</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* 3D Avatar/Object with Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-96 lg:h-[500px]"
        >
          <div className="relative w-full h-full">
            <Canvas
              camera={{ position: [0, 0, 5] }}
              onCreated={(state) => {
                console.log('Canvas created successfully');
              }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <Suspense fallback={null}>
                <AnimatedSphere />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
              </Suspense>
            </Canvas>
          </div>

          {/* Professional Photo with Effects */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl bg-gradient-to-r from-primary/10 to-blue-600/10 backdrop-blur-sm">
                <img
                  src="aboutimage1.png"
                  alt="Profile"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-blue-600/20 blur-xl -z-10 animate-pulse"></div>
            </motion.div>
          </div>
        </motion.div>

        {/* About Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          <h3 className="text-2xl md:text-3xl font-semibold">
            Passionate Developer
          </h3>

          <div className="space-y-4 text-muted-foreground whitespace-pre-wrap">
            {aboutText}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-6 pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">3+</div>
              <div className="text-sm text-muted-foreground">Client Projects</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
