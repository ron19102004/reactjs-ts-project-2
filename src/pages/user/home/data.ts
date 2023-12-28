/* eslint-disable @typescript-eslint/no-explicit-any */
import gtr1 from "../../../assets/gtr1.png";
import gtr2 from "../../../assets/gtr2.png";
import gtr3 from "../../../assets/gtr3.png";
import gtr4 from "../../../assets/gtr4.png";
import gtr5 from "../../../assets/gtr5.png";
export interface ISpecialThing {
  img: any;
  title: string;
  label?: string;
}
export const specialThings: ISpecialThing[] = [
  {
    title: "Chuyên gia đầu ngành - Bác sĩ giỏi - Chuyên viên giàu kinh nghiệm",
    img: gtr1,
    label: `Chúng tôi tự hào giới thiệu đội ngũ chuyên gia với kiến thức sâu rộng và tầm nhìn tiên tiến, sẵn sàng mang đến giải pháp xuất sắc trong các lĩnh vực chuyên môn của mình.

    Bác sĩ giỏi của chúng tôi không chỉ là những người nắm vững kiến thức y khoa mà còn là những nhà nghiên cứu tiên tiến, luôn theo dõi và áp dụng những phát triển mới nhất trong lĩnh vực y tế. Họ cam kết cung cấp dịch vụ chăm sóc sức khỏe cao cấp, đồng thời đặt lợi ích và sức khỏe của bệnh nhân lên hàng đầu.`,
  },
  {
    title: "Trang thiết bị hiện đại bật nhất",
    img: gtr2,
    label: `Trang thiết bị hiện đại của chúng tôi không chỉ là những công nghệ tiên tiến mà còn là biểu tượng của sự đổi mới và sang trọng. Chúng được thiết kế và sản xuất bởi những nhà kỹ sư hàng đầu, đảm bảo độ tin cậy, hiệu suất và tính thẩm mỹ.`,
  },
  {
    title: "Hiệu quả điều trị cao - Thành tựu nổi bật",
    img: gtr3,
    label: `Hiệu quả điều trị của chúng tôi không chỉ là kết quả số liệu mà còn là câu chuyện về sự chữa lành, đổi mới và chất lượng cuộc sống. Bác sĩ và chuyên gia của chúng tôi không ngừng nỗ lực để áp dụng những phương pháp điều trị tiên tiến nhất, sử dụng công nghệ hiện đại và tận dụng kiến thức chuyên sâu để đạt được kết quả tối ưu.`,
  },
  {
    title: "Quy trình toàn điện, khoa học, chuyên nghiệm",
    img: gtr4,
    label: `
    Chúng tôi tự tin rằng quy trình toàn diện, khoa học, và chuyên nghiệp của chúng tôi sẽ đưa đến những trải nghiệm chăm sóc sức khỏe tốt nhất, đáp ứng mọi mong đợi và nhu cầu của quý vị. Hãy đồng hành cùng chúng tôi trên hành trình chăm sóc sức khỏe của bạn.`,
  },
  {
    title: "Dịch vụ cao cấp - Chi phí hợp lý",
    img: gtr5,
    label: `Chúng tôi cam kết cung cấp trải nghiệm đẳng cấp, linh hoạt và tiện lợi, đồng thời duy trì chi phí phù hợp với mọi người. Chất lượng là ưu tiên hàng đầu của chúng tôi, và chúng tôi không ngừng nỗ lực để mang lại giá trị tốt nhất cho mỗi khoản chi trả của bạn. Hãy đồng hành với chúng tôi để trải nghiệm sự chuyên nghiệp và hài lòng từ dịch vụ của chúng tôi!`,
  },
];

import dp1 from "../../../assets/khoa-phuc-hoi-chuc-nang.png";
import dp2 from "../../../assets/icon-khoa-hoi-suc-cap-cuu-icu.png";
import dp3 from "../../../assets/khoa-da-lieu.png";
import dp4 from "../../../assets/icon_ngoaitonghop.png";
import dp5 from "../../../assets/Logo-Khoa-Dao-Tao.png";
import dp6 from "../../../assets/khoa-nhi.png";
export interface IDepartment extends ISpecialThing {}
export const departments: IDepartment[] = [
  {
    title: "Khoa Phục Hồi Chức Năng",
    img: dp1,
    label: `Khoa Phục Hồi Chức Năng là chuyên ngành y tế tập trung vào tái tạo và cải thiện khả năng hoạt động của cơ thể. Bằng cách kết hợp các phương pháp vật lý trị liệu, tập luyện và điều chỉnh lối sống, khoa này nhằm hỗ trợ người bệnh hồi phục sau chấn thương hoặc bệnh lý, giúp họ tái chiếm lại chất lượng cuộc sống và độ đàn hồi của cơ thể. Chuyên gia trong lĩnh vực này sử dụng kiến thức chuyên sâu về cơ bản y học và phương pháp thực hành để tối ưu hóa quá trình phục hồi của bệnh nhân.`,
  },
  {
    title: "Khoa Hồi Sức Cấp Cứu ICU",
    img: dp2,
    label: `
  Khoa Hồi Sức Cấp Cứu (ICU) là bộ mặt quan trọng của hệ thống y tế, tập trung chăm sóc những bệnh nhân nặng và nguy kịch. Đội ngũ chuyên gia ICU, bao gồm bác sĩ, y tá và chuyên gia chăm sóc sức khỏe, đặt ưu tiên cao vào giám sát liên tục, điều trị đa chuyên ngành, và hỗ trợ sinh học cần thiết. ICU là nơi cung cấp các dịch vụ như hỗ trợ hô hấp, theo dõi tim mạch, và quản lý đau, đồng thời tập trung vào việc cứu sống và duy trì sự ổn định của bệnh nhân trong những tình trạng khẩn cấp.`,
  },
  {
    title: "Khoa Da Liễu",
    img: dp3,
    label: `Khoa Da Liễu chuyên sâu vào chăm sóc, điều trị các vấn đề liên quan đến da, tóc, và móng. Các bác sĩ da liễu chuyên nghiệp trong lĩnh vực này đối mặt với nhiều tình trạng như mụn trứng cá, eczema, nấm, và các vấn đề da khác. Họ thực hiện các phương pháp điều trị như thuốc, liệu pháp ánh sáng, và quy trình da liễu để cải thiện sức khỏe và ngoại hình của bệnh nhân. Khoa Da Liễu đóng vai trò quan trọng trong việc duy trì và cải thiện sức khỏe của làn da.`,
  },
  {
    title: "Khoa Ngoại Tổng Hợp",
    img: dp4,
    label: `Khoa Ngoại Tổng Hợp chuyên sâu vào chẩn đoán và điều trị các bệnh lý ngoại khoa, tổng hợp nhiều chuyên ngành y học khác nhau. Bác sĩ chuyên khoa ngoại tổng hợp có kiến thức rộng về nhiều lĩnh vực y học, từ các vấn đề nội khoa đến phẫu thuật nhỏ. Họ đảm bảo quá trình chăm sóc toàn diện cho bệnh nhân, từ chẩn đoán ban đầu đến điều trị và theo dõi sau điều trị. Khoa này thường xuyên là cổng vào hệ thống y tế, cung cấp dịch vụ đa dạng và chăm sóc tích hợp cho các vấn đề y tế tổng thể của bệnh nhân.`,
  },
  {
    title: "Trung Tâm Đào Tạo & Nghiên Cứu Khoa Học",
    img: dp5,
    label: `Trung Tâm Đào Tạo & Nghiên Cứu Khoa Học là một tổ chức hoặc cơ sở giáo dục và nghiên cứu chuyên sâu trong một lĩnh vực cụ thể. Nhiệm vụ của trung tâm này là cung cấp chương trình đào tạo cao cấp và thực hiện các dự án nghiên cứu để đóng góp vào sự phát triển của ngành khoa học đó. Trung tâm thường thu hút các chuyên gia hàng đầu và sinh viên tài năng, tạo ra môi trường học thuật động lực và đổi mới. Đồng thời, trung tâm này có thể tổ chức các sự kiện, hội thảo, và hoạt động hợp tác với cộng đồng khoa học để chia sẻ kiến thức và kích thích sự phát triển trong lĩnh vực đó.`,
  },
  {
    title: "Khoa Nhi",
    img: dp6,
    label: `Khoa Nhi chuyên sâu vào chăm sóc sức khỏe của trẻ em, từ sơ sinh đến tuổi vị thành niên. Bác sĩ chuyên khoa Nhi có kiến thức sâu sắc về phát triển v físico, tâm lý và xã hội của trẻ, cũng như các vấn đề sức khỏe đặc biệt liên quan đến lứa tuổi này. Khoa Nhi thường xuyên tiếp cận các khía cạnh như tư vấn dinh dưỡng, phòng ngừa bệnh, và điều trị các tình trạng y tế phổ biến ở trẻ em như nhiễm trùng, tiêu hóa, và hô hấp. Điều này giúp đảm bảo sự phát triển và sức khỏe toàn diện của trẻ trong quá trình lớn lên.`,
  },
];