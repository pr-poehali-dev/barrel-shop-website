import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const products = [
    {
      id: 1,
      name: 'Классическая банная бочка',
      price: 150000,
      image: '/img/209a854f-1fad-439c-b632-081807bea412.jpg',
      description: 'Традиционная кедровая бочка для настоящих ценителей бани'
    },
    {
      id: 2,
      name: 'Премиум Офуро',
      price: 220000,
      image: '/img/b8609520-aa57-47e9-a654-769961b9b909.jpg',
      description: 'Японская банная бочка премиум класса из отборного кедра'
    },
    {
      id: 3,
      name: 'Семейная купель',
      price: 180000,
      image: '/img/53892eac-dc10-49bb-8044-db6948bd1c23.jpg',
      description: 'Просторная деревянная купель для всей семьи'
    }
  ];

  const advantages = [
    {
      icon: 'TreePine',
      title: 'Натуральные материалы',
      description: 'Изготавливаем из отборного кедра высшего качества'
    },
    {
      icon: 'Thermometer',
      title: 'Отличная терморегуляция',
      description: 'Дерево сохраняет тепло и создает комфортный микроклимат'
    },
    {
      icon: 'ShoppingCart',
      title: 'Быстрая доставка',
      description: 'Доставляем по всей России в кратчайшие сроки'
    },
    {
      icon: 'Heart',
      title: 'Здоровье и релакс',
      description: 'Банные процедуры укрепляют иммунитет и снимают стресс'
    },
    {
      icon: 'Thermometer',
      title: 'Долговечность',
      description: 'Наши бочки служат десятилетиями при правильном уходе'
    },
    {
      icon: 'ShoppingCart',
      title: 'Индивидуальный подход',
      description: 'Изготавливаем под ваши размеры и пожелания'
    }
  ];

  const handleOrderSubmit = async () => {
    if (!phoneNumber || !selectedProduct) return;
    
    const product = products.find(p => p.id === selectedProduct);
    
    // Отправка через Formspree
    const formData = new FormData();
    formData.append('product_name', product?.name || '');
    formData.append('product_price', `${product?.price.toLocaleString()} ₽`);
    formData.append('customer_phone', phoneNumber);
    formData.append('message', `Новая заявка на банную бочку!

Товар: ${product?.name}
Цена: ${product?.price.toLocaleString()} ₽
Телефон клиента: ${phoneNumber}

Свяжитесь с клиентом в ближайшее время.`);

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        toast({
          title: "Заявка отправлена!",
          description: "Мы свяжемся с вами в ближайшее время.",
        });
        
        setPhoneNumber('');
        setSelectedProduct(null);
      } else {
        throw new Error('Ошибка отправки');
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте еще раз или свяжитесь с нами по телефону.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-white font-montserrat">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold text-black">
            БаниБочки<span className="text-primary">.РФ</span>
          </div>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-black hover:text-primary transition-colors">Главная</a>
            <a href="#advantages" className="text-black hover:text-primary transition-colors">Преимущества</a>
            <a href="#about" className="text-black hover:text-primary transition-colors">О нас</a>
            <a href="#catalog" className="text-black hover:text-primary transition-colors">Каталог</a>
            <a href="#contacts" className="text-black hover:text-primary transition-colors">Контакты</a>
          </nav>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Icon name="Menu" size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white">
              <nav className="flex flex-col space-y-4 mt-8">
                <a href="#home" className="text-lg text-black hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Главная</a>
                <a href="#advantages" className="text-lg text-black hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Преимущества</a>
                <a href="#about" className="text-lg text-black hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>О нас</a>
                <a href="#catalog" className="text-lg text-black hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Каталог</a>
                <a href="#contacts" className="text-lg text-black hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Контакты</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen bg-gradient-to-br from-black via-black-light to-black flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white animate-fade-in">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Банные бочки 
                <span className="text-primary block">премиум класса</span>
              </h1>
              <p className="text-xl mb-8 text-gray-300 leading-relaxed">
                Создаем уникальные банные бочки из отборного кедра. Здоровье, релакс и удовольствие в каждой детали.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-4">
                  <a href="#catalog">Смотреть каталог</a>
                </Button>
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white text-lg px-8 py-4">
                  <a href="#about">О компании</a>
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <img 
                src="/img/209a854f-1fad-439c-b632-081807bea412.jpg" 
                alt="Банная бочка" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">15+ лет</div>
                <div className="text-sm">опыта работы</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="advantages" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
              Почему выбирают нас
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Мы создаем не просто бочки, а произведения искусства для вашего здоровья и комфорта
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon name={advantage.icon as any} size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-4">{advantage.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
                О нашей компании
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Более 15 лет мы специализируемся на изготовлении банных бочек премиум класса. 
                Каждое изделие создается вручную мастерами с многолетним опытом.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Мы используем только отборный кедр из экологически чистых регионов России. 
                Наши бочки не только красивы, но и полезны для здоровья благодаря уникальным 
                свойствам кедровой древесины.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-gray-600">довольных клиентов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">15+</div>
                  <div className="text-gray-600">лет опыта</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/img/b8609520-aa57-47e9-a654-769961b9b909.jpg" 
                alt="О компании" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
              Наши банные бочки
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Выберите идеальную бочку для вашего дома или дачи
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-black mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="text-2xl font-bold text-primary mb-4">
                    от {product.price.toLocaleString()} ₽
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90 text-white"
                        onClick={() => setSelectedProduct(product.id)}
                      >
                        Оставить заявку
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-black">
                          Заявка на {product.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="phone" className="text-black">Ваш номер телефона</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+7 (999) 123-45-67"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="mt-2"
                          />
                        </div>
                        <Button 
                          onClick={handleOrderSubmit}
                          className="w-full bg-primary hover:bg-primary/90 text-white"
                          disabled={!phoneNumber}
                        >
                          Отправить заявку
                        </Button>
                        <p className="text-sm text-gray-500 text-center">
                          Наш менеджер свяжется с вами в течение 30 минут
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Контакты</h2>
            <p className="text-xl text-gray-300">Свяжитесь с нами любым удобным способом</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            <div>
              <Icon name="MessageCircle" size={48} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Telegram</h3>
              <a href="https://t.me/Andrpn" className="text-primary hover:text-primary/80">@Andrpn</a>
            </div>
            <div>
              <Icon name="Mail" size={48} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <a href="mailto:artemtroshin57@gmail.com" className="text-primary hover:text-primary/80">artemtroshin57@gmail.com</a>
            </div>
            <div>
              <Icon name="Clock" size={48} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Время работы</h3>
              <p className="text-gray-300">Пн-Пт: 9:00-18:00<br />Сб-Вс: 10:00-16:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black-light text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-4">
            БаниБочки<span className="text-primary">.РФ</span>
          </div>
          <p className="text-gray-400 mb-4">
            Премиальные банные бочки из отборного кедра
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 БаниБочки.РФ. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;