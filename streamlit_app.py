
import streamlit as st
import streamlit.components.v1 as components
import os

# Streamlit sayfa yapılandırması
st.set_page_config(
    page_title="DreamWeather",
    page_icon="🌤️",
    layout="centered",
    initial_sidebar_state="collapsed",
)

# API Anahtarını Streamlit Secrets'tan al ve ortam değişkenine ata
if "API_KEY" in st.secrets:
    os.environ["API_KEY"] = st.secrets["API_KEY"]

# Streamlit UI elemanlarını gizle (Daha temiz bir görünüm için)
st.markdown("""
    <style>
        #MainMenu {visibility: hidden;}
        footer {visibility: hidden;}
        header {visibility: hidden;}
        .block-container {
            padding-top: 0rem;
            padding-bottom: 0rem;
            padding-left: 0rem;
            padding-right: 0rem;
        }
    </style>
""", unsafe_content_label=True)

# index.html dosyasını oku
try:
    with open("index.html", "r", encoding="utf-8") as f:
        html_code = f.read()
    
    # Uygulamayı bir iframe içinde göster (iPhone 13-14 benzeri boyutlar)
    components.html(html_code, height=844, scrolling=False)
except FileNotFoundError:
    st.error("index.html dosyası bulunamadı. Lütfen proje dizinini kontrol edin.")
