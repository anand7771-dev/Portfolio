import { SiPython, SiTensorflow, SiScikitlearn, SiPandas, SiNumpy, SiJupyter, SiStreamlit, SiOpencv } from 'react-icons/si';
import { FaReact, FaJs, FaHtml5, FaCss3Alt, FaAws, FaGitAlt, FaDocker, FaDatabase } from 'react-icons/fa';

export const skills = [
  {
    name: 'AI & Machine Learning',
    items: [
      { name: 'Python', icon: SiPython },
      { name: 'TensorFlow', icon: SiTensorflow },
      { name: 'Scikit-learn', icon: SiScikitlearn },
      { name: 'Pandas', icon: SiPandas },
      { name: 'NumPy', icon: SiNumpy },
      { name: 'OpenCV', icon: SiOpencv },
      { name: 'Jupyter', icon: SiJupyter },
    ]
  },
  {
    name: 'Web & Frontend',
    items: [
      { name: 'React', icon: FaReact },
      { name: 'JavaScript', icon: FaJs },
      { name: 'HTML5', icon: FaHtml5 },
      { name: 'CSS3', icon: FaCss3Alt },
      { name: 'Streamlit', icon: SiStreamlit },
    ]
  },
  {
    name: 'Cloud & Tools',
    items: [
      { name: 'AWS', icon: FaAws },
      { name: 'Git', icon: FaGitAlt },
      { name: 'Docker', icon: FaDocker },
      { name: 'SQL', icon: FaDatabase },
    ]
  }
];
