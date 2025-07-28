//문제와 답변 버튼
const questions = [
            { q: '친구가 갑자기 연락이 끊겼을 때 나는?', a: '걱정돼서 프로필 사진 확대함', type: 'E', b: '걍 바쁘겠지 뭐~', btype: 'T' },
            { q: '단체 채팅방에서 갈등이 생겼다!', a: '모두의 마음을 헤아림', type: 'E', b: '누가 잘못했는지 정리함', btype: 'T' },
            { q: '친구가 감정 폭발해 운다!', a: '같이 울고 간식 챙김', type: 'E', b: '문제 파악하고 해결 시도', btype: 'T' },
            { q: '누군가 내 계획에 반대하면?', a: '기분 상함', type: 'E', b: '논리로 반박함', btype: 'T' },
            { q: '오늘 하루의 목표는?', a: '사람들과 잘 지내기', type: 'E', b: '할 일 다 해치우기', btype: 'T' },
            { q: '모르는 사람이 나를 쳐다본다.', a: '왜 쳐다보지…?', type: 'E', b: '내가 멋있나 봄', btype: 'T' },
            { q: '내가 무대에 선다면?', a: '눈물 글썽이며 발라드 부름', type: 'E', b: '헤드뱅잉하며 소리 지름', btype: 'T' },
            { q: '친구가 롤 팀플중 실수했다!', a: '괜찮아~! 댓글 씀', type: 'E', b: '다음부턴 연습하자고 말함', btype: 'T' },
        ];

        let current = 0;
        let E_score = 0;
        let T_score = 0;
        let gender = null;

        const totalQuestions = questions.length;

        $('#container').ready(function() {
            // 성별 선택 핸들러
            $('#select-man').on('click', function() { selectGender('man'); });
            $('#select-woman').on('click', function() { selectGender('woman'); });

            // 테스트 시작 버튼 핸들러
            $('#startBtn').on('click', startTest);

            // 답변 버튼 핸들러 (동적으로 생성되므로, 부모 요소에 이벤트 위임)
            $('#questionBox').on('click', 'button', function() {
                const choice = $(this).attr('id');
                if (choice === 'choice-a') {
                    selectAnswer('A');
                } else {
                    selectAnswer('B');
                }
            });

            // 다시 하기 버튼 핸들러
            $('#restartBtn').on('click', function() {
                location.reload();
            });
        });

        function selectGender(selectedGender) {
            gender = selectedGender;
            $('#genderSelect').hide();
            $('#startBtn').show();
        }

        function startTest() {
            $('#startBtn').hide();
            $('#intro').hide();
            $('.gender').hide();
            showQuestion();
        }

        function showQuestion() {
            const q = questions[current];
            $('#questionBox').addClass('active').show();
            $('#question-text').text(`Q${current + 1}. ${q.q}`);
            $('#choice-a').text(q.a);
            $('#choice-b').text(q.b);
        }

        function selectAnswer(choice) {
            const q = questions[current];
            if (choice === 'A') {
                if (q.type === 'E') E_score++;
            } else if (choice === 'B') {
                if (q.btype === 'T') T_score++;
            }
            current++;

            updateProgressBar();

            if (current < totalQuestions) {
                showQuestion();
            } else {
                showResult();
            }
        }

        function updateProgressBar() {
            let progress = 0;
            if (current === 0) {
                progress = 0;
            } else if (current === 1) {
                progress = 25;
            } else if (current >= 7) {
                progress = 100;
            } else {
                progress = 25 + ((current - 1) / 6) * 75;
            }

            const progressBar = document.getElementById('progress-fill');
            progressBar.style.width = progress + '%';

            // 진행 단계에 따라 색상 변경 (7단계)
            if (current === 0) {
                 progressBar.style.backgroundColor = '#ffffff'; // 0단계 (시작 전)
            } else if (current === 1) {
                progressBar.style.backgroundColor = '#ff6f91'; // 1단계
            } else if (current === 2) {
                progressBar.style.backgroundColor = '#ff8c94'; // 2단계
            } else if (current === 3) {
                progressBar.style.backgroundColor = '#fbc7a4'; // 3단계
            } else if (current === 4) {
                progressBar.style.backgroundColor = '#a4c6fb'; // 4단계
            } else if (current === 5) {
                progressBar.style.backgroundColor = '#758cff'; // 5단계
            } else if (current === 6) {
                progressBar.style.backgroundColor = '#5a73e6'; // 6단계
            } else if (current >= 7) {
                progressBar.style.backgroundColor = '#3c5aeb'; // 7단계 (마지막, 100% 완료)
            } 
            
        }

        function showResult() {
            $('#questionBox').hide();
            const box = $('#resultBox');
            box.addClass('active').show();

            const total = E_score + T_score;
            const EPercent = total ? Math.round((E_score / total) * 100) : 0;
            const TPercent = total ? Math.round((T_score / total) * 100) : 0;

            let title = '';
            let description = '';
            let percent = 0;
            let barClass = '';
            let ratioText = '';
            let imageUrl = '';

            if (E_score > T_score) {
                title = '🌸 에겐력 뿜뿜';
                percent = EPercent;
                barClass = 'e';
                ratioText = `E ${percent}%`;

                if (gender === 'man') {
                    description = '감성 충만한 에겐남 타입!\n따뜻한 마음과 공감 능력으로 주변에 사랑받는 스타일입니다.\n테스토스테론도 적당히 갖춰 멋진 밸런스를 이루고 있어요.\n감성적이고 다정한 타입입니다.\n누구에게나 사랑받는 따뜻한 우주 공감왕!\n타인의 감정에 민감하고, 섬세하며, 안정감을 추구하고, 때로는 감성적인 분위기를 즐깁니다. 혼자만의 시간을 가지며 깊이 생각하는 것을 좋아할 수도 있습니다.\n추천 여행지: 교토(일본), 제주도, 피렌체(이탈리아)';
                    imageUrl = './assets/images/man.png';
                } else if (gender === 'woman') {
                    description = '여성스러운 따뜻한 감성의 에겐녀 타입!\n모두가 좋아하는 다정다감한 존재입니다.\n강한 친화력도 겸비한 매력 만점 타입이에요.\n편안하고 안정적인 환경을 선호하며, 공감과 소통을 중요하게 생각합니다. 아름다운 경치를 보거나 맛있는 음식을 먹으며 소소한 행복을 느끼는 것을 즐깁니다.\n추천 여행지:하와이(미국), 삿포로(일본), 다낭(베트남)';
                    imageUrl = './assets/images/woman.png';
                } 
            } else if (T_score > E_score) {
                title = '🔥 테토력 뿜뿜';
                percent = TPercent;
                barClass = 't';
                ratioText = `T ${percent}%`;

                if (gender === 'man') {
                    description = '남성다운 강인한 테토남 타입!\n목표 지향적이고 논리적인 스타일입니다.\n감성도 챙기며 밸런스를 이루고 있어요.\n논리적이고 지적인 타입!\n어디서든 문제 해결의 역할을 해내는 해결사!\n활기차고 주도적이며, 새로운 경험과 도전을 즐깁니다. 활동적인 액티비티나 예측 불가능한 모험을 통해 성취감을 느끼는 것을 선호합니다.\n추천 여행지: 알프스(스위스), 뉴질랜드, 치앙마이(태국)';
                    imageUrl = './assets/images/man.png'
                } else if (gender === 'woman') {
                    description = '강인하고 추진력 있는 테토녀 타입!\n친구들을 당당히 이끄는 리더 스타일입니다.\n따뜻한 감성도 함께 갖춘 멋진 여성입니다.\n논리적이고 지적인 타입!\n어디서든 문제 해결의 역할을 해내는 해결사!\n독립적이고 능동적이며, 계획적이고 효율적인 여행을 선호합니다. 새로운 문화나 환경에 대한 탐험 정신이 강하고, 혼자서도 잘 다닙니다.\n추천 여행지: 스위스, 뉴욕(미국), 베를린 (독일)';
                    imageUrl = './assets/images/woman.png';
                } 
            } else {
                title = '✨ 혼합형';
                percent = 50;
                barClass = 'e'; // 비율이 같을 경우, 에겐력 바를 기본으로 설정
                ratioText = `E/T ${percent}%`;

                if (gender === 'man') {
                    description = '감성과 논리의 완벽한 밸런스를 가진 남성!\n두 가지 매력을 모두 지닌 멋진 남성입니다.\n친구들 사이의 밸런스를 잡아주는 역할입니다.\n감성적이고 섬세하지만 다른 한편으로는 활동적이고 도전적인 면모를 동시에 가지고 있어 휴식과 액티비티, 문화 탐방과 자연 경험을 다채롭게 즐길 수 있는 여행지가 이상적입니다.\n추천 여행지: 스페인, 베트남(하노이), 캐나다';
                    imageUrl = './assets/images/man.png'
                } else if (gender === 'woman') {
                    description = '감성과 추진력을 모두 갖춘 균형 잡힌 여성!\n어디서든 사랑받는 만능 엔터네이너입니다.\n친구들 사이의 밸런스를 잡아주는 역할입니다.\n감성적이고 섬세하지만 다른 한편으로는 활동적이고 도전적인 면모를 동시에 가지고 있어 휴식과 액티비티, 문화 탐방과 자연 경험을 다채롭게 즐길 수 있는 여행지가 이상적입니다.\n추천 여행지: 스페인, 베트남(하노이), 캐나다';
                    imageUrl = './assets/images/woman.png';
                }
            }

            $('#result-title').text(title);

            if (imageUrl) {
                $('#result-img').attr('src', imageUrl).show();
            }
            $('#result-description').text(description);
            const ratioFill = $('#ratio-fill');
            ratioFill.css('width', percent + '%').removeClass('e t').addClass(barClass);
            $('#ratio-text').text(ratioText);

            // 연락처 양식 변수
            const form = document.querySelector("[data-form]");
            const formInputs = document.querySelectorAll("[data-form-input]");
            const formBtn = document.querySelector("[data-form-btn]");
            const ContactForm = document.getElementById("contact-form")

            // 폼 입력 항목 전체에 이벤트 적용
            for (let i = 0; i < formInputs.length; i++) {
            formInputs[i].addEventListener("input", function () {

                // 폼 유효성 검사
                if (form.checkValidity()) {
                formBtn.removeAttribute("enabled");
                } else {
                formBtn.setAttribute("enabled", "");
                }

            });
            }

            //이메일js 적용

            ContactForm.addEventListener("submit", function(e) {
                e.preventDefault();

                emailjs.sendForm("service_kggqyuc", "template_d2iaw6c", this)
                .then(function(response) {
                    alert("이메일이 성공적으로 발송되었습니다");
                }, function(error) {
                    alert("이메일 발송에 실패하였습니다");
                    console.error(error);
                });
            });

            //사진 업로드

            $(document).ready(function() {
            // 받는 사람 이메일 주소를 여기에 입력하세요.
            const recipientEmail = 'fly737000@gmail.com'; 
            const emailSubject = '사진 공유';
            const emailBody = '안녕하세요,\n\n선택한 사진을 보내드립니다.';

            // jQuery를 사용하여 HTML 요소를 선택합니다.
            const $fileUploader = $('#file-uploader');
            const $fileNameSpan = $('#file-name');
            const $sendButton = $('#send-button');

            // 페이지 로드 시 버튼을 비활성화합니다.
            $sendButton.prop('disabled', true);

            // 파일 선택(change) 이벤트 핸들러
            $fileUploader.on('change', function() {
                const file = this.files[0];
                if (file) {
                    // 선택된 파일 이름을 표시합니다.
                    $fileNameSpan.text(file.name);
                    // 버튼을 활성화합니다.
                    $sendButton.prop('disabled', false);
                } else {
                    // 파일이 선택되지 않았을 경우
                    $fileNameSpan.text('선택된 파일 없음');
                    $sendButton.prop('disabled', true);
                }
            });

            // 버튼 클릭(click) 이벤트 핸들러
            $sendButton.on('click', function() {
                const file = $fileUploader.get(0).files[0];
                if (file) {
                    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody + '\n\n파일명: ' + file.name)}`;
                    window.location.href = mailtoLink;
                } else {
                    alert('먼저 파일을 선택해주세요.');
                }
            });
        });

        $(document).ready(function() {
        const $container = $('#container');

        // 결과 화면 포지션 초기화
         $container.css({
                    'position': 'relative',
                    'top': '0',
                    'left': '0',
                    'transform': 'none'
                });

        });
            
        }