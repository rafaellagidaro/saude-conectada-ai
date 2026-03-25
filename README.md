## 🤖 Inteligência Artificial & Machine Learning

### 1. Backend Preditivo (Node.js + ml-regression)
O sistema não usa regras fixas. Ele implementa uma **Regressão Linear Simples (Ordinary Least Squares)** sobre o histórico do utilizador. O modelo calcula o coeficiente de determinação (R2) para avaliar a confiabilidade da previsão e gera um alerta de risco se o valor projetado para a próxima medição exceder o desvio padrão histórico.

### 2. IA Generativa (Simulação de LLM Prompting)
A aba de Saúde Mental simula um pipeline de **GenAI (Large Language Model)**. O status de risco atual do utilizador (gerado pelo ML do backend) é usado como o "contexto do prompt". O sistema gera um script de relaxamento ou meditação mindful **completamente adaptado** para neutralizar o risco fisiológico detectado.

### 3. Edge ML (Browser Pose Detection)
A aba BioMov AR está estruturada para integração com o **TensorFlow.js**, especificamente o modelo `blazepose`. Isso permite que a IA detecte 33 pontos de articulação no corpo em tempo real para corrigir a postura durante o exercício, sem enviar o vídeo para o servidor, garantindo privacidade (Privacy by Design).
